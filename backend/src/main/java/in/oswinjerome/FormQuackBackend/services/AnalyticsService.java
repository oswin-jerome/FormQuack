package in.oswinjerome.FormQuackBackend.services;

import in.oswinjerome.FormQuackBackend.dto.DashboardDTO;
import in.oswinjerome.FormQuackBackend.models.Domain;
import in.oswinjerome.FormQuackBackend.models.Form;
import in.oswinjerome.FormQuackBackend.models.User;
import in.oswinjerome.FormQuackBackend.repos.*;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    @Autowired
    AuthService authService;

    @Autowired
    SubmissionRepo submissionRepo;

    @Autowired
    DomainRepo domainRepo;
    @Autowired
    FormRepo formRepo;

    @Autowired
    private EmailRepo emailRepo;

    @Autowired
    private NotificationRepo notificationRepo;


    public User getCurrentUser() {
        return authService.getCurrentUser();
    }

    public List<Domain> getDomainsForUser(User user) {
        return domainRepo.getDomainsByUser(user);
    }

    public List<Form> getFormsForDomains(List<Domain> domains) {
        return formRepo.getFormsByDomainIn(domains);
    }

    public List<Form> getFormsForUser() {
        return formRepo.getFormsByDomainIn(getDomainsForUser(getCurrentUser()));
    }

    public ResponseEntity<ResponsePayload> monthlyAll() {

        User user = authService.getCurrentUser();
        List<Domain> domains = domainRepo.getDomainsByUser(user);

        List<Form> forms = formRepo.getFormsByDomainIn(domains);

        List<Map<String, Long>> res =  submissionRepo.countSubmissionsPerMonth(forms.stream().map(Form::getId).toList());



        return new ResponseEntity<>(new ResponsePayload(true,res,""), HttpStatus.OK);
    }

    public ResponseEntity<ResponsePayload> getDashboardData() {

        DashboardDTO dashboardDTO = new DashboardDTO();

        User user = authService.getCurrentUser();

//        Limits

        setAccountStats(dashboardDTO);

        List<Domain> domains = domainRepo.getDomainsByUser(user);
        dashboardDTO.setTotalDomains(domains.size());

        List<Form> forms = formRepo.getFormsByDomainIn(domains);
        dashboardDTO.setTotalForms(forms.size());
        Form form = formRepo.getTopBySubmissionCount(domains).orElse(new Form("None"));
        form.setSubmissions(null);
        dashboardDTO.setPopularForm(form);

        setTotalSubmissions(dashboardDTO);
        setEmailStats(dashboardDTO);
        setTotalAck(dashboardDTO);

        return new ResponseEntity<>(new ResponsePayload(true,dashboardDTO,""),HttpStatus.OK);
    }

    private void setEmailStats(DashboardDTO dashboardDTO) {
        LocalDate today = LocalDate.now();

        dashboardDTO.setTotalForwards(notificationRepo.countByFormIn(getFormsForUser()));
        dashboardDTO.setTotalForwardsToday(notificationRepo.countByFormInAndCreatedAtBetween(
                getFormsForUser(),
                today.atStartOfDay(),
                today.plusDays(1).atStartOfDay()
        ));

        dashboardDTO.setTotalForwardsThisMonth(notificationRepo.countByFormInAndCreatedAtBetween(
                getFormsForUser(),
                today.with(TemporalAdjusters.firstDayOfMonth()).atStartOfDay(),
                today.with(TemporalAdjusters.lastDayOfMonth()).atStartOfDay()
        ));


        dashboardDTO.setTotalFails(notificationRepo.countByFormInAndSentFalse(getFormsForUser()));
        dashboardDTO.setTotalFailsToday(notificationRepo.countByFormInAndSentFalseAndCreatedAtBetween(
                getFormsForUser(),
                today.atStartOfDay(),
                today.plusDays(1).atStartOfDay()
        ));

        dashboardDTO.setTotalFailsThisMonth(notificationRepo.countByFormInAndSentFalseAndCreatedAtBetween(
                getFormsForUser(),
                today.with(TemporalAdjusters.firstDayOfMonth()).atStartOfDay(),
                today.with(TemporalAdjusters.lastDayOfMonth()).atStartOfDay()
        ));
    }

    private void setAccountStats(DashboardDTO dashboardDTO) {
        dashboardDTO.setDomainLimit(getCurrentUser().getDomainLimit());
        dashboardDTO.setFormLimit(getCurrentUser().getFormsLimit() * getCurrentUser().getDomainLimit());
        dashboardDTO.setEmailsAdded(emailRepo.findByUser(getCurrentUser()).size());
    }

    private void setTotalSubmissions(DashboardDTO dashboardDTO){
        LocalDate today = LocalDate.now();

        int totalSubmissions = submissionRepo.countSubmissionByFormIn(getFormsForUser());

        dashboardDTO.setTotalSubmissions(totalSubmissions);
        dashboardDTO.setTotalSubmissionsToday(submissionRepo.countSubmissionByFormInAndCreatedAtBetween(getFormsForUser(),
                LocalDate.from(today.atStartOfDay()),
                LocalDate.from(today.plusDays(1).atStartOfDay())));
        dashboardDTO.setTotalSubmissionsThisMonth(
                submissionRepo.countSubmissionByFormInAndCreatedAtBetween(getFormsForUser(),
                        today.with(TemporalAdjusters.firstDayOfMonth()),
                        today.with(TemporalAdjusters.lastDayOfMonth())
                )
        );
    }

    private void setTotalAck(DashboardDTO dashboardDTO){
        LocalDate today = LocalDate.now();

        int totalAck = submissionRepo.countSubmissionByFormInAndSendAckIsTrue(getFormsForUser());

        dashboardDTO.setTotalAck(totalAck);
        dashboardDTO.setTotalAckToday(submissionRepo.countSubmissionByFormInAndCreatedAtBetweenAndSendAckIsTrue(getFormsForUser(),
                LocalDate.from(today.atStartOfDay()),
                LocalDate.from(today.plusDays(1).atStartOfDay())));
        dashboardDTO.setTotalAckThisMonth(
                submissionRepo.countSubmissionByFormInAndCreatedAtBetweenAndSendAckIsTrue(getFormsForUser(),
                        today.with(TemporalAdjusters.firstDayOfMonth()),
                        today.with(TemporalAdjusters.lastDayOfMonth())
                )
        );
    }



}
