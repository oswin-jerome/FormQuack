package in.oswinjerome.FormQuackBackend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import in.oswinjerome.FormQuackBackend.dto.SubmissionResponseDTO;
import in.oswinjerome.FormQuackBackend.enums.Plans;
import in.oswinjerome.FormQuackBackend.exceptions.InvalidHostException;
import in.oswinjerome.FormQuackBackend.models.Email;
import in.oswinjerome.FormQuackBackend.models.Form;
import in.oswinjerome.FormQuackBackend.models.Notification;
import in.oswinjerome.FormQuackBackend.models.Submission;
import in.oswinjerome.FormQuackBackend.repos.FormRepo;
import in.oswinjerome.FormQuackBackend.repos.NotificationRepo;
import in.oswinjerome.FormQuackBackend.repos.SubmissionRepo;
import in.oswinjerome.FormQuackBackend.services.messaging.RabbitMqProducer;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class SubmissionService {

    @Autowired
    AuthService authService;

    @Autowired
    FormRepo formRepo;

    @Autowired
    SubmissionRepo submissionRepo;

    @Autowired
    NotificationService notificationService;

    @Autowired
    NotificationRepo notificationRepo;

    @Autowired
    RabbitMqProducer rabbitMqProducer;

    @Autowired
    AnalyticsService analyticsService;

    @Transactional
    public ResponseEntity<ResponsePayload> createSubmission(String formId, String payload, String host, HashMap<String, Object> hostPayload) throws InvalidHostException, MessagingException {
        LocalDate today = LocalDate.now();

        Form form = formRepo.findById(formId).orElseThrow(()-> new EntityNotFoundException("Form not found"));

        validateHost(host, form);
        checkUsageLimit(form, today);

        Submission submission = new Submission();
        submission.setForm(form);
        submission.setPayload(payload);
        Submission submission1 = submissionRepo.save(submission);


        prepareAndSendNotificationMail(hostPayload, form, submission1);
        prepareAndSendAckMail(hostPayload, form,submission1);
        SubmissionResponseDTO submissionResponseDTO = new SubmissionResponseDTO();
        submissionResponseDTO.setSubmission(submission);
        submissionResponseDTO.setDomain(form.getDomain().getDomain());
        if(form.getDomain().getUser().getPlan() == Plans.PRO_PLUS){
            submissionResponseDTO.setMessage(form.getSuccessMessage());
        }

        return new ResponseEntity<>(new ResponsePayload(true,submissionResponseDTO,""), HttpStatus.CREATED);
    }

    private void prepareAndSendAckMail(HashMap<String, Object> hostPayload, Form form, Submission submission) {
        if(form.isSendAck() && hostPayload.containsKey("email")){
            String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
            Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);
            String email = hostPayload.get("email").toString();
            Matcher matcher = EMAIL_PATTERN.matcher(email);
             if(!matcher.matches()){
                 return;
             }
//            email.
            try {
                Map<String,Object> data = new HashMap<>();
                data.put("email", hostPayload.get("email"));
                data.put("message", form.getAckMessage());
                data.put("submission_id", submission.getId());
                rabbitMqProducer.sendAck(data);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private void prepareAndSendNotificationMail(HashMap<String, Object> hostPayload, Form form, Submission submission1) {
        if(form.isForwardToEmail() && !form.getEmails().stream().map(Email::getEmail).toList().isEmpty()){
            try {
                Map<String,Object> map = new HashMap<>();
                map.put("name", form.getDomain().getUser().getName());
                map.put("formName", form.getName());
                map.put("emailTo", form.getEmails().stream().map(Email::getEmail).toList());
                map.put("payload", hostPayload);

                Notification notification = createNotificationObject(form, submission1);
                map.put("notification_id",notification.getId());

                rabbitMqProducer.sendMessage(map);
            } catch (JsonProcessingException e) {
                System.out.println("RABBIT DEAD");
                throw new RuntimeException(e);
            }
        }
    }

    private Notification createNotificationObject(Form form, Submission submission1) {
        Notification notification = new Notification();
        notification.setSubmission(submission1);
        notification.setForm(submission1.getForm());
        notification.setEmails(form.getEmails().stream().map(Email::getEmail).collect(Collectors.toSet()));
        notification = notificationRepo.save(notification);
        return notification;
    }

    private void checkUsageLimit(Form form, LocalDate today) throws InvalidHostException {
        int count = submissionRepo.countSubmissionByFormAndCreatedAtBetween(
                form,
                today.with(TemporalAdjusters.firstDayOfMonth()),
                today.with(TemporalAdjusters.lastDayOfMonth())
        );

        if(count> form.getDomain().getUser().getFormsLimit()){
//           TODO: Trigger alert to user
            throw new InvalidHostException("Monthly limit exceeded. Upgrade to continue");
        }
    }

    private static void validateHost(String host, Form form) throws InvalidHostException {
        if(!form.getDomain().getDomain().equals(host)){
            throw new InvalidHostException("Your domain is not associated with this form. Please check the form url.");
        }
    }

    public ResponseEntity<ResponsePayload> getSubmissions(String formId) {
        Form form = formRepo.findById(formId).orElse(null);

        if(form==null){
            throw new EntityNotFoundException("Form not found");
        }

        List<Submission> submissionList = submissionRepo.findSubmissionsByForm(form);
        submissionList.forEach(c->{
            c.setForm(null);
        });

        return new ResponseEntity<>(new ResponsePayload(true,submissionList,""), HttpStatus.OK);

    }
}
