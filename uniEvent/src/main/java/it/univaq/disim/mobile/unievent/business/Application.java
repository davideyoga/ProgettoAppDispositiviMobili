package it.univaq.disim.mobile.unievent.business;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Application {

    /**
     * Per inserire dati nel db appena parte il server
     * @return
     */
    @Bean
    public CommandLineRunner loadData(){
        return null;
    }


    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}