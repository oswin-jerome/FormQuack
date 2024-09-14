package in.oswinjerome.FormQuackBackend.models;

import com.fasterxml.jackson.annotation.JsonRawValue;
import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;

@Entity
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


    public Form getForm() {
        return form;
    }

    public void setForm(Form form) {
        this.form = form;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}
