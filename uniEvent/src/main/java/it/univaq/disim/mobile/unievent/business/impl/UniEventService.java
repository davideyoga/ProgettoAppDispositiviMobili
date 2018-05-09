package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.domain.Session;
import it.univaq.disim.mobile.unievent.business.domain.User;
import it.univaq.disim.mobile.unievent.business.domain.UserPreference;

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
    //End User


    //UserPreference
    void createUserPreference(UserPreference userPreference);

    UserPreference findUserPreferenceByName(String name);
    //End UserPreference



    //Event
    void createEvent(Event event);

    List<Event> findHotEvent();

    List<Event> findAllEvents();

    //End Event


    void save(User user);

}
