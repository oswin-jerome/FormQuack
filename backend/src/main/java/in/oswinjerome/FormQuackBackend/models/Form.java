package in.oswinjerome.FormQuackBackend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;
import java.util.Set;

@Entity
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

   @ManyToMany
   @JoinTable(
           name = "forms_emails"
   )
   private Set<Email> emails;


    public Domain getDomain() {
        return domain;
    }

    public void setDomain(Domain domain) {
        this.domain = domain;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public boolean isForwardToEmail() {
        return forwardToEmail;
    }

    public void setForwardToEmail(boolean forwardToEmail) {
        this.forwardToEmail = forwardToEmail;
    }

    public Set<Email> getEmails() {
        return emails;
    }

    public void setEmails(Set<Email> emails) {
        this.emails = emails;
    }
}
