package in.oswinjerome.FormQuackBackend.exceptions;


import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(JwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ResponseEntity<Object> tokenExpired(JwtException ex) {
        return new ResponseEntity<>(new ResponsePayload(false,null,"Invalid token"), HttpStatus.UNAUTHORIZED);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(DomainLimitExceededException.class)
    public ResponseEntity<ResponsePayload> limitException(DomainLimitExceededException e){

        return new ResponseEntity<>(
                new ResponsePayload(false,null,e.getMessage())
                , HttpStatus.UNPROCESSABLE_ENTITY
        );
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ResponsePayload> entityNotFound(EntityNotFoundException e){

        return new ResponseEntity<>(
                new ResponsePayload(false,null,e.getMessage())
                , HttpStatus.NOT_FOUND
        );
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(InvalidHostException.class)
    public ResponseEntity<ResponsePayload> invalidHost(InvalidHostException e){

        return new ResponseEntity<>(
                new ResponsePayload(false,null,e.getMessage())
                , HttpStatus.UNPROCESSABLE_ENTITY
        );
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ResponsePayload> duplicateEmail(DuplicateEmailException e){

        return new ResponseEntity<>(
                new ResponsePayload(false,null,e.getMessage())
                , HttpStatus.UNPROCESSABLE_ENTITY
        );
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(ActionNotAllowedException.class)
    public ResponseEntity<ResponsePayload> badAction(ActionNotAllowedException e){

        return new ResponseEntity<>(
                new ResponsePayload(false,null,e.getMessage())
                , HttpStatus.UNPROCESSABLE_ENTITY
        );
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ResponsePayload> messageError(MessagingException e){

        return new ResponseEntity<>(
                new ResponsePayload(false,null,e.getMessage())
                , HttpStatus.SERVICE_UNAVAILABLE
        );
    }
    @ResponseBody
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ResponsePayload> userNotFound(UsernameNotFoundException e){

        return new ResponseEntity<>(
                new ResponsePayload(false,null,e.getMessage())
                , HttpStatus.UNAUTHORIZED
        );
    }


}
