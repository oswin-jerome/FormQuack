package in.oswinjerome.FormQuackBackend.repos;

import in.oswinjerome.FormQuackBackend.models.Domain;
import in.oswinjerome.FormQuackBackend.models.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FormRepo extends JpaRepository<Form,String> {

    List<Form> getFormsByDomainIn(List<Domain> domains);
    List<Form> getFormsByDomain(Domain domain);


    @Query("SELECT f, COUNT (s.id) as count FROM Form f JOIN Submission s ON f = s.form WHERE f.domain IN :domains GROUP BY f.id ORDER BY count LIMIT 1")
    Optional<Form> getTopBySubmissionCount(List<Domain> domains);
    

}
