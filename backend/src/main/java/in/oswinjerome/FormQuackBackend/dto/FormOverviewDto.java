package in.oswinjerome.FormQuackBackend.dto;

import in.oswinjerome.FormQuackBackend.models.Domain;
import in.oswinjerome.FormQuackBackend.models.Email;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class FormOverviewDto {

    private String id;

    private String name;
    private boolean isActive;
    private boolean forwardToEmail;
    private Domain domain;

    public int totalSubmissions;
    private int submissionsThisMonth;
    private int submissionsToday;
    private Set<Email> emails;

    private int submissionLimitPerForm;

    private boolean sendAck;
    private String ackMessage;
    private String successMessage;


    public FormOverviewDto(String id, String name, boolean isActive) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
    }


    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }


}
