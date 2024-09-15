package in.oswinjerome.FormQuackBackend.controllers;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import in.oswinjerome.FormQuackBackend.exceptions.InvalidHostException;
import in.oswinjerome.FormQuackBackend.services.SubmissionService;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/public")
public class PublicController {


    @Autowired
    SubmissionService submissionService;
    
    @PostMapping("/forms/{formId}")
    public ResponseEntity<ResponsePayload> receiveForm(@RequestBody Object body, @PathVariable String formId) throws JsonProcessingException, InvalidHostException, MessagingException {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(body);
        HashMap<String,Object> hostPayload = (HashMap<String, Object>) body;
        System.out.println(hostPayload.values());
        if(hostPayload.get("host")==null){
            throw  new InvalidHostException("our domain is not associated with this form. Please check the form url.");
        }
        return submissionService.createSubmission(formId,json,hostPayload.get("host").toString(),hostPayload);
    }


}


