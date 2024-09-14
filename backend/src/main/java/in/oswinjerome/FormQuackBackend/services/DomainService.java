package in.oswinjerome.FormQuackBackend.services;

import in.oswinjerome.FormQuackBackend.dto.DomainListDto;
import in.oswinjerome.FormQuackBackend.dto.FormOverviewDto;
import in.oswinjerome.FormQuackBackend.exceptions.DomainLimitExceededException;
import in.oswinjerome.FormQuackBackend.models.Domain;
import in.oswinjerome.FormQuackBackend.models.Form;
import in.oswinjerome.FormQuackBackend.repos.DomainRepo;
import in.oswinjerome.FormQuackBackend.repos.SubmissionRepo;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DomainService {

    @Autowired
    DomainRepo domainRepo;

    @Autowired
    AuthService authService;

    @Autowired
    SubmissionRepo submissionRepo;


    public ResponseEntity<ResponsePayload> create(Domain domain) throws DomainLimitExceededException {

        Optional<Domain> existing = domainRepo.getDomainByUserAndDomain(authService.getCurrentUser(),
                domain.getDomain());
        if(existing.isPresent()){
            return new ResponseEntity<>(new ResponsePayload(false,null,"Domain already exist"),HttpStatus.UNPROCESSABLE_ENTITY);
        }

        List<Domain> domainList = domainRepo.getDomainsByUser(authService.getCurrentUser());

        if(domainList.size() >= authService.getCurrentUser().getDomainLimit()){
            throw new DomainLimitExceededException("Your domain limit exceeded");
        }

        Domain newDomain = domainRepo.save(domain);

        return new ResponseEntity<>(new ResponsePayload(true,newDomain,""), HttpStatus.CREATED);
    }

    public ResponseEntity<ResponsePayload> usersDomains() {

        List<Domain> domainList = domainRepo.getDomainsByUser(authService.getCurrentUser());
        List<DomainListDto> result =  domainList.stream().map(c-> new DomainListDto(
                c.getId(),
                c.getDomain(),
                c.getForms().size()
        )).toList();

        return new ResponseEntity<>(
                new ResponsePayload(true,result,""),
                HttpStatus.OK
        );
    }

    public ResponseEntity<ResponsePayload> getDomain(Long domainId) {


        Domain domain = domainRepo.getDomainByUserAndId(authService.getCurrentUser(), domainId).orElse(null);

        if(domain==null){
            throw new EntityNotFoundException("Domain not found");
        }

        DomainListDto domainListDto = new DomainListDto(domain.getId(), domain.getDomain(), domain.getForms().size());
        List<Form> forms = domain.getForms();
        List<FormOverviewDto> formOverviewDtos = forms.stream().map((c)->{
            FormOverviewDto formOverviewDto  = new FormOverviewDto(c.getId(),c.getName(),c.isActive());
            formOverviewDto.setTotalSubmissions(submissionRepo.countSubmissionByForm(c));

            return  formOverviewDto;
        }).toList();

        domainListDto.setForms(formOverviewDtos);

        return new ResponseEntity<>(
                new ResponsePayload(true,domainListDto,""),
                HttpStatus.OK
        );
    }
}
