package in.oswinjerome.FormQuackBackend.services.messaging;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.oswinjerome.FormQuackBackend.configs.RabbitMQConfig;
import in.oswinjerome.FormQuackBackend.services.NotificationService;
import jakarta.mail.MessagingException;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.core.type.TypeReference;

@Service
public class RabbitMQConsumer {

    @Autowired
    NotificationService notificationService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME, ackMode = "AUTO")
    public void receiveMessage(Message message) throws JsonProcessingException, MessagingException, UnsupportedEncodingException {
         final ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(new String(message.getBody()));
        String key = message.getMessageProperties().getReceivedRoutingKey();
        System.out.println(key);
        if(key.equals("routing.key.test")){
            Map<String, Object> map = objectMapper.readValue(new String(message.getBody()), new TypeReference<HashMap<String, Object>>() {});
            notificationService.sendEmail((ArrayList<String>) map.get("emailTo"),map.get("formName")+" Submission",map);
        }

        if(key.equals("routing.key.ack")){
            System.out.println("####### ACK #######");
            Map<String, Object> map = objectMapper.readValue(new String(message.getBody()), new TypeReference<HashMap<String, Object>>() {});
            notificationService.sendAckMessage((String) map.get("email"),
                    (String) map.get("message"),(String) map.get("submission_id"));

        }
        System.out.println("Received message: " + new String(message.getBody()));
    }
}
