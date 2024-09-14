package in.oswinjerome.FormQuackBackend.dto;

public class EmailPayload {
    private int id;
    private boolean toAdd;

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isToAdd() {
        return toAdd;
    }

    public void setToAdd(boolean toAdd) {
        this.toAdd = toAdd;
    }
}
