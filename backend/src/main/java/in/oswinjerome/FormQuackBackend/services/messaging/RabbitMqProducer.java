package in.oswinjerome.FormQuackBackend.services.messaging;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.oswinjerome.FormQuackBackend.configs.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RabbitMqProducer {

    @Autowired
    RabbitTemplate rabbitTemplate;

    public void sendMessage(Map<String,Object> message) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(message);
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, "routing.key.test", jsonString);
    }

}
