package in.oswinjerome.FormQuackBackend.controllers;

import in.oswinjerome.FormQuackBackend.services.SubmissionService;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/submissions")
public class SubmissionController {

    @Autowired
    SubmissionService submissionService;

    @GetMapping("/{formId}")
    public ResponseEntity<ResponsePayload> getSubmissions(@PathVariable String formId){

        return submissionService.getSubmissions(formId);
    }

}
