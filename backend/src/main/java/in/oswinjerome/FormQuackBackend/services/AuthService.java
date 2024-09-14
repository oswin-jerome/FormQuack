package in.oswinjerome.FormQuackBackend.services;


import in.oswinjerome.FormQuackBackend.models.Email;
import in.oswinjerome.FormQuackBackend.models.User;
import in.oswinjerome.FormQuackBackend.repos.EmailRepo;
import in.oswinjerome.FormQuackBackend.repos.UserRepo;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthService {
    @Autowired
    UserRepo usersRepo;

    @Autowired
    EmailRepo emailRepo;

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Transactional
    public ResponseEntity<ResponsePayload> save(User user){

        if(usersRepo.findByEmail(user.getEmail()).isPresent()){
            return new ResponseEntity<>(new ResponsePayload(false,null,"User already exists"), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        User u = usersRepo.save(user);
        Email email = new Email();
        email.setEmail(u.getEmail());
        email.setUser(u);
        email.setCreatedAt(new Date());

        emailRepo.save(email);

        return new ResponseEntity<>(new ResponsePayload(true,u,"OK"), HttpStatus.CREATED);
    }

    public String login(User user) {
        System.out.println(user.getEmail()+"  "+user.getPassword() );
        Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));

        if(auth.isAuthenticated()){
            return jwtService.generateToken(user.getEmail());
        }

        return null;
    }

    public User getCurrentUser(){

        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public ResponseEntity<ResponsePayload> updateUser(User newUser) {

        User user = getCurrentUser();

        if(newUser.getPlan()!=null){
            user.setPlan(newUser.getPlan());
        }

        if(newUser.getPassword()!=null){
            user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        }

        usersRepo.save(user);

        return new ResponseEntity<>(new ResponsePayload(true,user,""),HttpStatus.OK);

    }
}

