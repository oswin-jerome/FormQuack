package in.oswinjerome.FormQuackBackend.dto;

import in.oswinjerome.FormQuackBackend.models.Domain;
import in.oswinjerome.FormQuackBackend.models.Email;

import java.util.Set;

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


    public FormOverviewDto(String id, String name, boolean isActive) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Domain getDomain() {
        return domain;
    }

    public void setDomain(Domain domain) {
        this.domain = domain;
    }

    public int getTotalSubmissions() {
        return totalSubmissions;
    }

    public void setTotalSubmissions(int totalSubmissions) {
        this.totalSubmissions = totalSubmissions;
    }

    public int getSubmissionsThisMonth() {
        return submissionsThisMonth;
    }

    public void setSubmissionsThisMonth(int submissionsThisMonth) {
        this.submissionsThisMonth = submissionsThisMonth;
    }

    public int getSubmissionsToday() {
        return submissionsToday;
    }

    public void setSubmissionsToday(int submissionsToday) {
        this.submissionsToday = submissionsToday;
    }

    public boolean isForwardToEmail() {
        return forwardToEmail;
    }

    public void setForwardToEmail(boolean forwardToEmail) {
        this.forwardToEmail = forwardToEmail;
    }

    public Set<Email> getEmails() {
        return emails;
    }

    public void setEmails(Set<Email> emails) {
        this.emails = emails;
    }
}
