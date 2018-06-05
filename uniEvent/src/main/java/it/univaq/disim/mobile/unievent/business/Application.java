package it.univaq.disim.mobile.unievent.business;

import it.univaq.disim.mobile.unievent.business.domain.Category;
import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.impl.CategoryRepository;
import it.univaq.disim.mobile.unievent.business.impl.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

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
            event.setCity("Roma");


            Event event2 = new Event();
            event2.setTitle("PartyHard2");
            event2.setCity("Roma");



            Event event3 = new Event();
            event3.setTitle("Apecolmorto");
            event3.setCity("Milano");

            Event event4 = new Event();
            event4.setTitle("Apecolmorto2");
            event4.setCity("Milano");



            Category category = new Category();
            category.setName("FesteInPiscina");
            category.setDescription("La festa dove ci sta la gnuna");
            categoryRepository.save(category);

            Category category2 = new Category();
            category2.setName("Aperitivi snob");
            category2.setDescription("Ape per le persone con le cravatte");
            categoryRepository.save(category2);


            List<Category> categories1 = new ArrayList <>();
            categories1.add(category);

            event.setCategories(categories1);
            eventRepository.save(event);
            event3.setCategories(categories1);
            eventRepository.save(event3);


            List<Category> categories2 = new ArrayList <>();
            categories2.add(category2);

            event2.setCategories(categories2);
            eventRepository.save(event2);
            event4.setCategories(categories2);
            eventRepository.save(event4);



        };
    }
}