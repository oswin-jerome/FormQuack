package in.oswinjerome.FormQuackBackend.repos;

import in.oswinjerome.FormQuackBackend.models.Form;
import in.oswinjerome.FormQuackBackend.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification,Long> {

    int countByFormIn(List<Form> forms);
    int countByFormInAndSentFalse(List<Form> forms);

    int countByFormInAndCreatedAtBetween(List<Form> forms, LocalDateTime from, LocalDateTime to);

    int countByFormInAndSentFalseAndCreatedAtBetween(List<Form> forms, LocalDateTime from, LocalDateTime to);
}
