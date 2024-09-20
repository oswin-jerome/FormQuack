package in.oswinjerome.FormQuackBackend.models;

import com.fasterxml.jackson.annotation.JsonRawValue;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Setter
public class Submission {
    @UuidGenerator()
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "form_id")
    private Form form;

    @Column(name = "payload", columnDefinition = "text")
//    @JsonRawValue
    private String payload;

    @Column(nullable = true)
    private LocalDate createdAt = LocalDate.now();

    @Column(nullable = true)
    private Boolean sendAck = false;

}
