package in.oswinjerome.FormQuackBackend.controllers;

import in.oswinjerome.FormQuackBackend.dto.EmailPayload;
import in.oswinjerome.FormQuackBackend.dto.UpdateFormDto;
import in.oswinjerome.FormQuackBackend.exceptions.DomainLimitExceededException;
import in.oswinjerome.FormQuackBackend.models.Email;
import in.oswinjerome.FormQuackBackend.models.Form;
import in.oswinjerome.FormQuackBackend.models.User;
import in.oswinjerome.FormQuackBackend.services.FormService;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/forms")
public class FormController {

    @Autowired
    FormService formService;

    @PostMapping("/{domainId}")
    public ResponseEntity<ResponsePayload> createForm(@RequestBody Form form,
                                                      @PathVariable Long domainId) throws DomainLimitExceededException {

        return formService.create(form,domainId);
    }

    @GetMapping("/{formId}")
    public ResponseEntity<ResponsePayload> viewAForm(@PathVariable String formId){

       return formService.getForm(formId);
    }

    @PatchMapping("/{formId}/email")
    public ResponseEntity<ResponsePayload> updateEmail(
            @PathVariable String formId, @RequestBody EmailPayload email){

        return formService.updateEmail(formId,email);
    }

    @PatchMapping("/{formId}")
    public ResponseEntity<ResponsePayload> updateForm(
            @PathVariable String formId, @RequestBody UpdateFormDto toUpdate){

        return formService.updateForm(formId,toUpdate);
    }


}
