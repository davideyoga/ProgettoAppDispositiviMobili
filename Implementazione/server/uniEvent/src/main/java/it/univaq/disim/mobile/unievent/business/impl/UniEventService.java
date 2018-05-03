package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.Session;
import it.univaq.disim.mobile.unievent.business.domain.User;
import it.univaq.disim.mobile.unievent.business.domain.UserPreference;

/**
 * @author uniEvent
 */
public interface UniEventService {

    void createUser(User user);

    void createUserPreference(UserPreference userPreference);

    User findUserByEmail(String emailUser);

    UserPreference findUserPreferenceByName(String name);

    void save(User user);

    Session login(String email, String password);

}
