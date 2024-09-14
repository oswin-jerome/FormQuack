package in.oswinjerome.FormQuackBackend.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Value("${spring.mail.from}")
    private String fromAddress;

    public String getFromAddress() {
        return fromAddress;
    }
}
