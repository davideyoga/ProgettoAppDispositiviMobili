package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.*;

import java.util.List;
import java.util.Set;

/**
 * @author uniEvent
 */
public interface UniEventService {

    //User
    void createUser(User user);

    User findUserByEmail(String emailUser);

    Session login(String email, String password);

    void save(User user);
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

    //End Event


    //Category

    List<Category> getCategories();

    //End Category

}
