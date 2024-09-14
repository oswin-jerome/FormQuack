package in.oswinjerome.FormQuackBackend.utils;

import org.springframework.http.HttpStatusCode;

import java.io.Serializable;

public class ResponsePayload implements Serializable {

    boolean isOk;
    Object data;
    String err;

    public ResponsePayload(boolean isOk, Object data, String err) {
        this.isOk = isOk;
        this.data = data;
        this.err = err;
    }

    public boolean isOk() {
        return isOk;
    }

    public void setOk(boolean ok) {
        isOk = ok;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getErr() {
        return err;
    }

    public void setErr(String err) {
        this.err = err;
    }
}
