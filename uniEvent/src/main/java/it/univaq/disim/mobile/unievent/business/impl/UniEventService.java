package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.*;

import java.util.Date;
import java.util.List;

/**
 * @author uniEvent
 */
public interface UniEventService {

    //User
    void createUser(User user);

    User findUserByEmail(String emailUser);

    Session login(String email, String password);

    void save(User user);

    User findUserByIdEvent(Long id);

    User findUserById(Long idUser);

    void logout(String token);

    //End User


    //UserPreference
    void createUserPreference(UserPreference userPreference);

    UserPreference findUserPreferenceByName(String name);
    //End UserPreference



    //Event
    void createEvent(Event event);

    List<Event> findHotEvent();

    List<Event> findAllEvents();

    List<String> getCities();

    List<Event> findEventsByCity(String city);

    List<Event> findEventsByDate(Date date);

    List<Event> findEventsByDateBeforeBetween(Date start, Date end);

    List<Event> findEventsByCategory(Category category );

    Event findEventById(Long id);

    //End Event


    //Category

    Category findCategoryByName(String name);

    List<Category> getCategories();

    //End Category

    

}
