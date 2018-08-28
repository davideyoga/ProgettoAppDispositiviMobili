package it.univaq.disim.mobile.unievent.business;

import it.univaq.disim.mobile.unievent.business.domain.Category;
import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.domain.User;
import it.univaq.disim.mobile.unievent.business.impl.CategoryRepository;
import it.univaq.disim.mobile.unievent.business.impl.EventRepository;
import it.univaq.disim.mobile.unievent.business.impl.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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
    public CommandLineRunner loadData(EventRepository eventRepository, CategoryRepository categoryRepository, UserRepository userRepository) {
        return (args) -> {

            /*
            CREAZIONE UTENTI
             */
            User user = new User();
            user.setEmail("d.micarelli7@gmail.com");
            user.setPassword("d.micarelli");
            user.setName("davide");

            User user2 = new User();
            user2.setEmail("d.micarelli27@gmail.com");
            user2.setPassword("d.micarelli2");
            user2.setName("davide2");



            userRepository.save(user);
            userRepository.save(user2);

            /*
            CREAZIONE EVENTI
             */
            Event event = new Event();
            event.setTitle("PartyHard1");
            event.setViews(new Long(100));
            event.setCity("Roma");
            event.setAddress("via del corso 77");
            event.setImage("/home/davide/Scrivania/gianni");
            event.setPrice(19.68f);
            event.setDate(new Date(Calendar.getInstance().getTimeInMillis()));



            Event event2 = new Event();
            event2.setTitle("PartyHard2");
            event2.setCity("Roma");
            event2.setDate(new Date(Calendar.getInstance().getTimeInMillis()));
//            event2.setPrice(1.90f);


            Event event3 = new Event();
            event3.setTitle("Apecolmorto");
            event3.setCity("Milano");
            event3.setPrice(17.69f);
            event3.setDate(new Date(Calendar.getInstance().getTimeInMillis() + 86400000));
            event3.setPrice(1.5f);

            Event event4 = new Event();
            event4.setTitle("Apecolmorto2");
            event4.setCity("Milano");
            event4.setPrice(18.62f);
            event4.setDate(new Date(Calendar.getInstance().getTimeInMillis() + 86400000));
            event4.setPrice(4f);


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
            event.setCreator(user);
            eventRepository.save(event);
            event3.setCategories(categories1);
            eventRepository.save(event3);


            List<Category> categories2 = new ArrayList <>();
            categories2.add(category2);

            event2.setCategories(categories2);
            event2.setCreator(user2);
            eventRepository.save(event2);
            event4.setCategories(categories2);
            eventRepository.save(event4);



        };
    }
}