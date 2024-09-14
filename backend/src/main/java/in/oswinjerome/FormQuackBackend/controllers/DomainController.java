package in.oswinjerome.FormQuackBackend.controllers;

import in.oswinjerome.FormQuackBackend.exceptions.DomainLimitExceededException;
import in.oswinjerome.FormQuackBackend.models.Domain;
import in.oswinjerome.FormQuackBackend.services.AuthService;
import in.oswinjerome.FormQuackBackend.services.DomainService;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/domains")
public class DomainController {

    @Autowired
    DomainService domainService;

    @Autowired
    AuthService authService;

    @PostMapping
    public ResponseEntity<ResponsePayload> create(@RequestBody Domain domain) throws DomainLimitExceededException {

        domain.setUser(authService.getCurrentUser());

        return domainService.create(domain);
    }

    @GetMapping
    public ResponseEntity<ResponsePayload> view(){

        return domainService.usersDomains();
    }

    @GetMapping
    @RequestMapping("{domainId}")
    public ResponseEntity<ResponsePayload> viewADomain(@PathVariable Long domainId){

        return domainService.getDomain(domainId);
    }

}
