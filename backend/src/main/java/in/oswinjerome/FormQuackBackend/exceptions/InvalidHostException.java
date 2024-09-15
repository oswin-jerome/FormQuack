package in.oswinjerome.FormQuackBackend.exceptions;

public class InvalidHostException extends Exception {

    String message;

    public InvalidHostException(String message) {
        super(message);
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
