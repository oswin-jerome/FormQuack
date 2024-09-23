package in.oswinjerome.FormQuackBackend.repos;

import in.oswinjerome.FormQuackBackend.models.Form;
import in.oswinjerome.FormQuackBackend.models.Submission;
import in.oswinjerome.FormQuackBackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    int countSubmissionByFormInAndSendAckIsTrue(List<Form> forms);
    int countSubmissionByFormInAndCreatedAtBetweenAndSendAckIsTrue(List<Form> forms, LocalDate from,LocalDate to);


    @Query(value = """
            SELECT gs.date::date AS month_year,COALESCE(COUNT(s.id), 0) AS count FROM generate_series(
               CURRENT_DATE - INTERVAL '29 days',
                CURRENT_DATE,
                '1 day'
            ) AS gs(date) LEFT JOIN submission s ON DATE(s.created_at) = gs.date::date
            AND s.form_id IN (:ids)
        GROUP BY\s
            gs.date
        ORDER BY\s
            gs.date;
""", nativeQuery = true)
    List<Map<String, Long>> countSubmissionsPerMonth(@Param("ids") List<String> ids);





}
