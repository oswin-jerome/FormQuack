package in.oswinjerome.FormQuackBackend.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UpdateFormDto {

    private Boolean forwardToEmail;
    private Boolean sendAck;
    private String ackMessage;
private  String successMessage;


}
