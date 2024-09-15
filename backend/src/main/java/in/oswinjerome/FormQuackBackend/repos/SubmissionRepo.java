package in.oswinjerome.FormQuackBackend.repos;

import in.oswinjerome.FormQuackBackend.models.Form;
import in.oswinjerome.FormQuackBackend.models.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface SubmissionRepo extends JpaRepository<Submission,String> {


    List<Submission> findSubmissionsByForm(Form form);
    List<Submission> findSubmissionsByFormOrderByIdDesc(Form form);

    int countSubmissionByForm(Form form);
    int countSubmissionByFormAndCreatedAtBetween(Form form, LocalDate from,LocalDate to);

    int countSubmissionByFormIn(List<Form> forms);
    int countSubmissionByFormInAndCreatedAtBetween(List<Form> forms, LocalDate from,LocalDate to);


//    TODO: Limit to 30 days
    @Query("SELECT TO_CHAR(s.createdAt,'dd Mon yy') as month_year, COUNT(*) AS count FROM Submission as s WHERE s.form IN :forms GROUP BY s.createdAt ORDER BY s.createdAt")
    List<Map<String, Long>> countSubmissionsPerMonth(List<Form> forms);





}
