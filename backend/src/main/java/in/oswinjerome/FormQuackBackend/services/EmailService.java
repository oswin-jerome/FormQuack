package in.oswinjerome.FormQuackBackend.services;


import in.oswinjerome.FormQuackBackend.exceptions.ActionNotAllowedException;
import in.oswinjerome.FormQuackBackend.exceptions.DuplicateEmailException;
import in.oswinjerome.FormQuackBackend.models.Email;
import in.oswinjerome.FormQuackBackend.models.User;
import in.oswinjerome.FormQuackBackend.repos.EmailRepo;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class EmailService {

    @Autowired
    AuthService authService;

    @Autowired
    EmailRepo emailRepo;

    public ResponseEntity<ResponsePayload> addEmail(String emailText){
        User user = authService.getCurrentUser();

        List<Email> emails = emailRepo.findByUser(user);
        if(emails.size()>=3){
            throw new ActionNotAllowedException("Email limit exceeded. Upgrade to add more emails.");
        }

        Optional<Email> old = emailRepo.findByUserAndEmail(user,emailText);
        if(old.isPresent()){
            throw new DuplicateEmailException("Email already exists");
        }



        Email email = new Email();
        email.setUser(user);
        email.setEmail(emailText);
        email.setCreatedAt(new Date());

        emailRepo.save(email);

        return new ResponseEntity<>(new ResponsePayload(true,email,""), HttpStatus.CREATED);

    }

    public ResponseEntity<ResponsePayload> getEmails(){
        User user = authService.getCurrentUser();

        List<Email> emails = emailRepo.findByUser(user);


        return new ResponseEntity<>(new ResponsePayload(true,emails,""), HttpStatus.CREATED);

    }


    public ResponseEntity<ResponsePayload> deleteEmail(Long emailId) {

        User user = authService.getCurrentUser();

        Optional<Email> email = emailRepo.findByIdAndUser(emailId,user);

        if(email.isEmpty()){
            throw new EntityNotFoundException("Email not found");
        }



        if(email.get().getEmail().equals(user.getEmail())){
            throw new ActionNotAllowedException("Account email cannot be deleted");
        }

        emailRepo.delete(email.get());

        return new ResponseEntity<>(new ResponsePayload(true,null,""),HttpStatus.OK);

    }
}
