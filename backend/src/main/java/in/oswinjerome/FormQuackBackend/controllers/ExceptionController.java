package in.oswinjerome.FormQuackBackend.controllers;

import io.jsonwebtoken.JwtException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/exception")
public class ExceptionController {

    @GetMapping
    public void ex(){
        throw new JwtException("sdsd");
    }
}
