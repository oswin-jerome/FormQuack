package in.oswinjerome.FormQuackBackend.controllers;


import in.oswinjerome.FormQuackBackend.enums.Plans;
import in.oswinjerome.FormQuackBackend.models.User;
import in.oswinjerome.FormQuackBackend.services.AuthService;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

@RequestMapping("/auth")
@RestController()
public class AuthController {

    @Autowired
    AuthService service;

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/csrf")
    public CsrfToken getCsrf(HttpServletRequest request) {

        return (CsrfToken) request.getAttribute("_csrf");
    }

    @PostMapping("register")
    public ResponseEntity<ResponsePayload> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return service.save(user);
    }

    @PostMapping("login")
    public String login(@RequestBody User user) {

        return service.login(user);
    }

    @GetMapping("user")
    public ResponseEntity<ResponsePayload> user() {

        return new ResponseEntity<>(new ResponsePayload(true,service.getCurrentUser(),""), HttpStatus.OK);
    }

    @PatchMapping("user/plan")
    public ResponseEntity<ResponsePayload> changePlan(@RequestBody User newUser) {

        return service.updateUser(newUser);
    }

    @PatchMapping("user/change_password")
    public ResponseEntity<ResponsePayload> changePassword(@RequestBody User newUser) {

        return service.updateUser(newUser);
    }
}
