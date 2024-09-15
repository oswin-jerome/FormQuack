package in.oswinjerome.FormQuackBackend.services;

import in.oswinjerome.FormQuackBackend.configs.AppConfig;
import in.oswinjerome.FormQuackBackend.models.Notification;
import in.oswinjerome.FormQuackBackend.models.User;
import in.oswinjerome.FormQuackBackend.repos.NotificationRepo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;

import org.thymeleaf.context.Context;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class NotificationService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    AppConfig appConfig;

    @Autowired
    NotificationRepo notificationRepo;

    public void sendEmail(ArrayList<String> toEmail, String subject, Map<String, Object> templateModel) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        // Create Thymeleaf context with dynamic variables
        Context context = new Context();
        context.setVariables(templateModel);

        // Generate the HTML content using Thymeleaf template
        String htmlContent = templateEngine.process("email-template", context);


        helper.setTo(toEmail.toArray(String[]::new));
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        helper.setFrom(appConfig.getFromAddress());

        // Send the email
        mailSender.send(mimeMessage);


       if(templateModel.containsKey("notification_id")){
           Long nId = Long.valueOf(templateModel.get("notification_id").toString());
           Optional<Notification> notification = notificationRepo.findById(nId);
           System.out.println(notification.isPresent());
           if(notification.isPresent()){
               Notification n = notification.get();
               n.setSent(true);
               notificationRepo.save(n);
           }
       }

    }

    public void sendPasswordReset(User user, String password) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        // Create Thymeleaf context with dynamic variables
        Context context = new Context();
        Map<String,Object> map = new HashMap<>();
        map.put("password",password);
        map.put("user",user);
        context.setVariables(map);

        // Generate the HTML content using Thymeleaf template
        String htmlContent = templateEngine.process("reset-template", context);

        // TODO: sent to multiple people
        helper.setTo(user.getEmail());
        helper.setSubject("Password Reset");
        helper.setText(htmlContent, true); // Set 'true' to enable HTML content
        helper.setFrom(appConfig.getFromAddress());

        // Send the email
        mailSender.send(mimeMessage);
        System.out.println("Dynamic HTML email sent successfully");
    }
}
