package in.oswinjerome.FormQuackBackend.repos;

import in.oswinjerome.FormQuackBackend.models.Email;
import in.oswinjerome.FormQuackBackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmailRepo extends JpaRepository<Email, Long> {


    Optional<Email> findByUserAndEmail(User user, String email);
    Optional<Email> findByIdAndUser(Long id, User user);

    List<Email> findByUser(User user);
}
