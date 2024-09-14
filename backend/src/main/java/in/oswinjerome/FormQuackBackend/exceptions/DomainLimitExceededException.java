package in.oswinjerome.FormQuackBackend.exceptions;

public class DomainLimitExceededException extends Exception
{
    String message;

    public DomainLimitExceededException(String message) {
        super(message);
        this.message = message;
    }
}
