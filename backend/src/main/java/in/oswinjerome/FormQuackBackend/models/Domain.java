package in.oswinjerome.FormQuackBackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Entity
public class Domain {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

//    Domain should be unique to a user
    @Pattern(
            regexp = "^(?!-)([A-Za-z0-9-]{1,63}\\.)+[A-Za-z]{2,15}$",
            message = "Invalid domain format"
    )
    private String domain;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "domain")
    @JsonManagedReference
    private List<Form> forms;

}
