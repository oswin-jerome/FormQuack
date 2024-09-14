package in.oswinjerome.FormQuackBackend.repos;

import in.oswinjerome.FormQuackBackend.models.Domain;
import in.oswinjerome.FormQuackBackend.models.Form;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FormRepo extends JpaRepository<Form,String> {

    List<Form> getFormsByDomainIn(List<Domain> domains);
    List<Form> getFormsByDomain(Domain domain);
}
