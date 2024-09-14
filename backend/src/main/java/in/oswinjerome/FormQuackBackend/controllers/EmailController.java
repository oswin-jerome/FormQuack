package in.oswinjerome.FormQuackBackend.controllers;

import in.oswinjerome.FormQuackBackend.models.Email;
import in.oswinjerome.FormQuackBackend.services.EmailService;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/emails")
public class EmailController {

    @Autowired
    EmailService emailService;

    @PostMapping
    public ResponseEntity<ResponsePayload> createEmail(@RequestBody Email email){
        return emailService.addEmail(email.getEmail());
    }

    @GetMapping
    public ResponseEntity<ResponsePayload> getEmails(){
        return emailService.getEmails();
    }

  @DeleteMapping("{emailId}")
    public ResponseEntity<ResponsePayload> deleteEmail(@PathVariable Long emailId){
        return emailService.deleteEmail(emailId);
    }



}
