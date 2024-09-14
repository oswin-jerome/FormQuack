package in.oswinjerome.FormQuackBackend.repos;

import in.oswinjerome.FormQuackBackend.models.Domain;
import in.oswinjerome.FormQuackBackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DomainRepo extends JpaRepository<Domain,Long> {

    List<Domain> getDomainsByUser(User user);
    Optional<Domain> getDomainByUserAndDomain(User user,String domain);
    Optional<Domain> getDomainByUserAndId(User user,Long id);
}
