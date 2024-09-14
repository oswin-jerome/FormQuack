package in.oswinjerome.FormQuackBackend.services;

import in.oswinjerome.FormQuackBackend.models.Domain;
import in.oswinjerome.FormQuackBackend.models.Form;
import in.oswinjerome.FormQuackBackend.models.User;
import in.oswinjerome.FormQuackBackend.repos.DomainRepo;
import in.oswinjerome.FormQuackBackend.repos.FormRepo;
import in.oswinjerome.FormQuackBackend.repos.SubmissionRepo;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

    public ResponseEntity<ResponsePayload> monthlyAll() {

        User user = authService.getCurrentUser();
        List<Domain> domains = domainRepo.getDomainsByUser(user);

        List<Form> forms = formRepo.getFormsByDomainIn(domains);

        List<Map<String, Long>> res =  submissionRepo.countSubmissionsPerMonth(forms);


        return new ResponseEntity<>(new ResponsePayload(true,res,""), HttpStatus.OK);
    }
}
