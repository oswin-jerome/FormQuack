package in.oswinjerome.FormQuackBackend.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import in.oswinjerome.FormQuackBackend.exceptions.InvalidHostException;
import in.oswinjerome.FormQuackBackend.models.Email;
import in.oswinjerome.FormQuackBackend.models.Form;
import in.oswinjerome.FormQuackBackend.models.Submission;
import in.oswinjerome.FormQuackBackend.repos.FormRepo;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SubmissionService {


    @Autowired
    FormRepo formRepo;

    @Autowired
    SubmissionRepo submissionRepo;

    @Autowired
    NotificationService notificationService;

    @Autowired
    RabbitMqProducer rabbitMqProducer;


    @Transactional
    public ResponseEntity<ResponsePayload> createSubmission(String formId, String payload, String host, HashMap<String, Object> hostPayload) throws InvalidHostException, MessagingException {

        Form form = formRepo.findById(formId).orElse(null);
        if(form==null){
            throw new EntityNotFoundException("Form not found");
        }

        if(!form.getDomain().getDomain().equals(host)){
            throw new InvalidHostException();
        }

        Submission submission = new Submission();
        submission.setForm(form);
        submission.setPayload(payload);
        Submission submission1 = submissionRepo.save(submission);
        Map<String,Object> map = new HashMap<>();

        map.put("name",form.getDomain().getUser().getName());
        map.put("formName",form.getName());
        map.put("emailTo",form.getEmails().stream().map(Email::getEmail).toList());
        map.put("payload",hostPayload);


        if(form.isForwardToEmail()){
            try {
                rabbitMqProducer.sendMessage(map);
            } catch (JsonProcessingException e) {
                System.out.println("RABBIT DEAD");
                throw new RuntimeException(e);
            }
        }

        return new ResponseEntity<>(new ResponsePayload(true,submission1,""), HttpStatus.CREATED);
    }

    public ResponseEntity<ResponsePayload> getSubmissions(String formId) {
        Form form = formRepo.findById(formId).orElse(null);

        if(form==null){
            throw new EntityNotFoundException("Form not found");
        }

        List<Submission> submissionList = submissionRepo.findSubmissionsByForm(form);
        submissionList = submissionList.stream().map(c->{
            c.setForm(null);
            return  c;
        }).toList();

        return new ResponseEntity<>(new ResponsePayload(true,submissionList,""), HttpStatus.CREATED);

    }
}
