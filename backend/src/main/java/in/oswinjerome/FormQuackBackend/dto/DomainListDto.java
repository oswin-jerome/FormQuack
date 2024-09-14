package in.oswinjerome.FormQuackBackend.dto;

import in.oswinjerome.FormQuackBackend.models.Form;

import java.util.List;

public class DomainListDto {
    private Long id;
    private String domain;
    private int formCount;
    private List<FormOverviewDto> forms;

    public DomainListDto(Long id, String domain, int formCount) {
        this.id = id;
        this.domain = domain;
        this.formCount = formCount;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public int getFormCount() {
        return formCount;
    }

    public void setFormCount(int formCount) {
        this.formCount = formCount;
    }

    public List<FormOverviewDto> getForms() {
        return forms;
    }

    public void setForms(List<FormOverviewDto> forms) {
        this.forms = forms;
    }
}
