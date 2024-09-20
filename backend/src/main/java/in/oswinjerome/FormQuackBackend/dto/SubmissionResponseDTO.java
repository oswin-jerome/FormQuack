package in.oswinjerome.FormQuackBackend.dto;

import in.oswinjerome.FormQuackBackend.models.Submission;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubmissionResponseDTO {
    Submission submission;
    String message;
    String domain;
}
