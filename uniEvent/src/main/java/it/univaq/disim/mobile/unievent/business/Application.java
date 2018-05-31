package it.univaq.disim.mobile.unievent.business;

import it.univaq.disim.mobile.unievent.business.domain.Category;
import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.impl.CategoryRepository;
import it.univaq.disim.mobile.unievent.business.impl.EventRepository;
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


    @Bean
    public CommandLineRunner loadData(EventRepository eventRepository, CategoryRepository categoryRepository) {
        return (args) -> {
            Event event = new Event();
            event.setTitle("PartyHard1");
            event.setViews(new Long(100));
            eventRepository.save(event);

            Event event2 = new Event();
            event2.setTitle("PartyHard2");
            eventRepository.save(event2);

            Category category = new Category();
            category.setName("FesteInPiscina");
            category.setDescription("La festa dove ci sta la gnuna");
            categoryRepository.save(category);

        };
    }
}