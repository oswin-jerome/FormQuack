package in.oswinjerome.FormQuackBackend.configs;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String QUEUE_NAME = "email_queue";
    public static final String EXCHANGE_NAME = "email_exchange";

    @Bean
    public Queue queue(){
        return new Queue(QUEUE_NAME,false);
    }

    @Bean
    public TopicExchange topicExchange(){
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Binding binding(Queue myQueue, TopicExchange myExchange) {
        return BindingBuilder.bind(myQueue).to(myExchange).with("routing.key.#");
    }

}
