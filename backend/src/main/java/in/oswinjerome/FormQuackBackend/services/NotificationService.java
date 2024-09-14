package in.oswinjerome.FormQuackBackend.services;

import in.oswinjerome.FormQuackBackend.configs.AppConfig;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;

import org.thymeleaf.context.Context;

import java.util.ArrayList;
import java.util.Map;

@Service
public class NotificationService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    AppConfig appConfig;

    public void sendEmail(ArrayList<String> toEmail, String subject, Map<String, Object> templateModel) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        // Create Thymeleaf context with dynamic variables
        Context context = new Context();
        context.setVariables(templateModel);

        // Generate the HTML content using Thymeleaf template
        String htmlContent = templateEngine.process("email-template", context);

        // TODO: sent to multiple people
        helper.setTo(toEmail.toArray(String[]::new));
        helper.setSubject(subject);
        helper.setText(htmlContent, true); // Set 'true' to enable HTML content
        helper.setFrom(appConfig.getFromAddress());

        // Send the email
        mailSender.send(mimeMessage);
        System.out.println("Dynamic HTML email sent successfully");
    }

}
