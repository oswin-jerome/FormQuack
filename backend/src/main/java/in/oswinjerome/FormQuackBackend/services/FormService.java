package in.oswinjerome.FormQuackBackend.services;

import in.oswinjerome.FormQuackBackend.dto.EmailPayload;
import in.oswinjerome.FormQuackBackend.dto.FormOverviewDto;
import in.oswinjerome.FormQuackBackend.dto.UpdateFormDto;
import in.oswinjerome.FormQuackBackend.exceptions.DomainLimitExceededException;
import in.oswinjerome.FormQuackBackend.models.Domain;
import in.oswinjerome.FormQuackBackend.models.Email;
import in.oswinjerome.FormQuackBackend.models.Form;
import in.oswinjerome.FormQuackBackend.repos.DomainRepo;
import in.oswinjerome.FormQuackBackend.repos.EmailRepo;
import in.oswinjerome.FormQuackBackend.repos.FormRepo;
import in.oswinjerome.FormQuackBackend.repos.SubmissionRepo;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class FormService {

    @Autowired
    FormRepo formRepo;

    @Autowired
    DomainRepo domainRepo;

    @Autowired
    AuthService authService;

    @Autowired
    SubmissionRepo submissionRepo;
    @Autowired
    private EmailRepo emailRepo;

    public ResponseEntity<ResponsePayload> create(Form form, Long domainId) throws DomainLimitExceededException {

        Optional<Domain> domain = domainRepo.findById(domainId);
        if(domain.isEmpty()){
            return new ResponseEntity<>(new ResponsePayload(false,null,"Domain not found"),HttpStatus.NOT_FOUND);
        }

        List<Form> formList = formRepo.getFormsByDomain(domain.get());
        System.out.println(formList.size());

        if(formList.size() >= authService.getCurrentUser().getFormsLimit()){
            throw new DomainLimitExceededException("Your form limit exceeded");
        }

        form.setDomain(domain.get());
       Form created =  formRepo.save(form);

       return new ResponseEntity<>(new ResponsePayload(true,created,""), HttpStatus.CREATED);
    }

    public ResponseEntity<ResponsePayload> getForm(String formId) {

        LocalDate today = LocalDate.now();

        Optional<Form> form = formRepo.findById(formId);

        if(form.isEmpty()){
            return new ResponseEntity<>(new ResponsePayload(false,null,"Form not found"),HttpStatus.NOT_FOUND);
        }

        FormOverviewDto formDto = new FormOverviewDto(form.get().getId(), form.get().getName(),form.get().isActive());
        formDto.setForwardToEmail(form.get().isForwardToEmail());
        formDto.setTotalSubmissions(submissionRepo.countSubmissionByForm(form.get()));
        formDto.setSubmissionsToday(submissionRepo.countSubmissionByFormAndCreatedAtBetween(
                form.get(),
                today.atStartOfDay().toLocalDate(),
                today.plusDays(1).atStartOfDay().toLocalDate()
        ));
        formDto.setSubmissionsThisMonth(submissionRepo.countSubmissionByFormAndCreatedAtBetween(
                form.get(),
                today.with(TemporalAdjusters.firstDayOfMonth()),
                today.with(TemporalAdjusters.lastDayOfMonth())
        ));

        formDto.setEmails(form.get().getEmails());
        Domain domain = form.get().getDomain();
        domain.setForms(null);
        formDto.setDomain(domain);
        formDto.setSubmissionLimitPerForm(authService.getCurrentUser().getSubmissionLimitPerForm());

        return new ResponseEntity<>(new ResponsePayload(true,formDto,""),HttpStatus.OK);


    }


    public ResponseEntity<ResponsePayload> updateForm(String formId, UpdateFormDto toUpdate) {

        Optional<Form> form = formRepo.findById(formId);

        if(form.isEmpty()){
            throw new EntityNotFoundException("Form not found");
        }
//        TODO: check if user owns it
        Form actual = form.get();
        if(toUpdate.getForwardToEmail()!=null){
            actual.setForwardToEmail(toUpdate.getForwardToEmail());
        }

        formRepo.save(actual);

        return new ResponseEntity<>(new ResponsePayload(true,actual,""),HttpStatus.OK);

    }

    public ResponseEntity<ResponsePayload> updateEmail(String formId, EmailPayload email) {

        Form form = formRepo.findById(formId).orElse(null);
        if(form==null){
            throw new EntityNotFoundException("Form not found");
        }

        Email obj = emailRepo.findById(email.getId()).orElse(null);
//        TODO: check ownership
        if(obj==null){
            throw new EntityNotFoundException("Email not found");
        }

        Set<Email> emails = form.getEmails();
        if(email.isToAdd()){
            emails.add(obj);
        }else{
            emails.remove(obj);
        }

        form.setEmails(emails);
        formRepo.save(form);

        return new ResponseEntity<>(new ResponsePayload(true,form,""),HttpStatus.OK);


    }
}
