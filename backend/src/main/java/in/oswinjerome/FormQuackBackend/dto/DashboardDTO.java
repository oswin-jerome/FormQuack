package in.oswinjerome.FormQuackBackend.dto;


import in.oswinjerome.FormQuackBackend.models.Form;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardDTO {

//    User
    int emailsAdded;

//    Domain
    int totalDomains;
    int domainLimit;

//    Form
    int totalForms;
    int formLimit;
    Form popularForm;

    int totalSubmissions;
    int totalSubmissionsToday;
    int totalSubmissionsThisMonth;

    int totalForwards;
    int totalForwardsToday;
    int totalForwardsThisMonth;

    int totalFails;
    int totalFailsToday;
    int totalFailsThisMonth;



}


