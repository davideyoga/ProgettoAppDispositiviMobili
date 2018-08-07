package it.univaq.disim.mobile.unievent.business;

import it.univaq.disim.mobile.unievent.business.domain.Category;
import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.domain.Participate;
import it.univaq.disim.mobile.unievent.business.domain.User;
import it.univaq.disim.mobile.unievent.business.impl.CategoryRepository;
import it.univaq.disim.mobile.unievent.business.impl.EventRepository;
import it.univaq.disim.mobile.unievent.business.impl.ParticipateRepository;
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
    public CommandLineRunner loadData(EventRepository eventRepository, CategoryRepository categoryRepository, UserRepository userRepository, ParticipateRepository participateRepository) {
        return (args) -> {

            /*
            CREAZIONE UTENTI
             */
            User user = new User();
            user.setEmail("d.micarelli7@gmail.com");
            user.setPassword("d.micarelli");
            user.setName("Davide");
            user.setSurname("Micarelli");

            User user2 = new User();
            user2.setEmail("d.micarelli27@gmail.com");
            user2.setPassword("d.micarelli2");
            user2.setName("Davide");
            user2.setSurname("Micarelli");


            userRepository.save(user);
            userRepository.save(user2);

            /*
            CREAZIONE EVENTI
             */
            Event event = new Event();
            event.setTitle("PartyHard1");
            event.setViews(new Long(100));
            event.setCity("Roma");
            event.setDescription("Evento bello in cui ci si diverte");
            event.setImage("/home/davide/Scrivania/gianni");

            event.setDate(new Date(Calendar.getInstance().getTimeInMillis()));



            Event event2 = new Event();
            event2.setTitle("PartyHard2");
            event2.setCity("Roma");
            event2.setDescription("Evento bello in cui ci si diverte");
            event2.setDate(new Date(Calendar.getInstance().getTimeInMillis()));


            Event event3 = new Event();
            event3.setTitle("Apecolmorto");
            event3.setCity("Milano");
            event3.setDescription("Evento bello in cui ci si diverte");
            event3.setDate(new Date(Calendar.getInstance().getTimeInMillis() + 86400000));

            Event event4 = new Event();
            event4.setTitle("Apecolmorto2");
            event4.setCity("Milano");
            event4.setDescription("Evento bello in cui ci si diverte");
            event4.setDate(new Date(Calendar.getInstance().getTimeInMillis() + 86400000));


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
            event3.setCreator(user);
            eventRepository.save(event3);


            List<Category> categories2 = new ArrayList <>();
            categories2.add(category2);

            event2.setCategories(categories2);
            event2.setCreator(user2);
            eventRepository.save(event2);
            event4.setCategories(categories2);
            event4.setCreator(user2);
            eventRepository.save(event4);


            Participate participate1 = new Participate();
            participate1.setUser(user);
            participate1.setEvent(event);
            participate1.setDataPrenotation(new Date(Calendar.getInstance().getTimeInMillis()));
            participate1.setVoteReview(3);
            participate1.setDescriptionReview("Evento bellissimo1");


            Participate participate2 = new Participate();
            participate2.setUser(user2);
            participate2.setEvent(event2);
            participate2.setDataPrenotation(new Date(Calendar.getInstance().getTimeInMillis()));
            participate2.setVoteReview(4);
            participate2.setDescriptionReview("Evento bellissimo2");

            Participate participate3 = new Participate();
            participate3.setUser(user2);
            participate3.setEvent(event);
            participate3.setDataPrenotation(new Date(Calendar.getInstance().getTimeInMillis()));
            participate3.setVoteReview(5);
            participate3.setDescriptionReview("Evento bellissimo3");

            participateRepository.save(participate1);
            participateRepository.save(participate2);
            participateRepository.save(participate3);


        };
    }
}