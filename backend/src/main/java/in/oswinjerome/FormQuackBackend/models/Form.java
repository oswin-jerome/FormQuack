package in.oswinjerome.FormQuackBackend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Form {

    @UuidGenerator()
    @Id
    private String id;

    private String name;
    private boolean isActive;

    @ManyToOne
    @JoinColumn(name = "domain_id")
    @JsonBackReference
    private Domain domain;

    private boolean forwardToEmail = false;
    @Column(nullable = true)
    private boolean sendAck = false;
    @Column(nullable = true)
    private String ackMessage;

    @Column(nullable = true)
    private String successMessage;

    @ManyToMany
    @JoinTable(
            name = "forms_emails"
    )
    private Set<Email> emails;

    @OneToMany(mappedBy = "form")
    @JsonIgnore
    private List<Submission> submissions;


    public Form(String name) {
        this.name = name;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
