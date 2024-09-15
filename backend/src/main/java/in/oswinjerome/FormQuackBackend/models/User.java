package in.oswinjerome.FormQuackBackend.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import in.oswinjerome.FormQuackBackend.enums.Plans;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @Column(unique = true)
    private String email;

//    TODO: remove from response
    private String password;

    private Plans plan = Plans.BASIC;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getDomainLimit(){

        if(plan == Plans.PRO){
            return 5;
        }

        if(plan == Plans.PRO_PLUS){
            return 20;
        }

        return 3;
    }

    public int getFormsLimit(){

        if(plan == Plans.PRO){
            return 5;
        }

        if(plan == Plans.PRO_PLUS){
            return 20;
        }

        return 3;
    }

    public int getSubmissionLimitPerForm(){

        if(plan == Plans.PRO){
            return 5;
        }

        if(plan == Plans.PRO_PLUS){
            return 20;
        }

        return 3;
    }


    public Plans getPlan() {
        return plan;
    }

    public void setPlan(Plans plan) {
        this.plan = plan;
    }
}
