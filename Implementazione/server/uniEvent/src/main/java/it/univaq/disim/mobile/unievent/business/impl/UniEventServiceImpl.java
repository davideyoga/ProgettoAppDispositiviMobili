package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.domain.User;
import it.univaq.disim.mobile.unievent.business.domain.Session;
import it.univaq.disim.mobile.unievent.business.domain.UserPreference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.Set;

/**
 * @author uniEvent
 */
@Service
@Transactional
public class UniEventServiceImpl implements UniEventService {


    /*
     *  REPOSITORY
     */
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserPreferenceRepository userPreferenceRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private EventRepository eventRepository;

    /*
     * END REPOSITORY
     */



    @Override
    public void createUser(User user) {
        userRepository.save(user);
    }

    @Override
    public void createUserPreference(UserPreference userPreference) {
        userPreferenceRepository.save(userPreference);
    }

    @Override
    public User findUserByEmail(String emailUser) {
        return userRepository.findByEmail(emailUser);
    }

    @Override
    public UserPreference findUserPreferenceByName(String name) {

        return userPreferenceRepository.findByName(name);

    }




    @Override
    public void createEvent(Event event){
        this.eventRepository.save(event);
    }

    @Override
    public List<Event> findHotEvent() {
        return null;

    }

    @Override
    public List <Event> findAllEvents() {
        return eventRepository.findAll();
    }


    public void save(User user){


        //userRepository.save(user);

        entityManager.persist(user);
        entityManager.flush();

        entityManager.unwrap(Session.class);

    }

    @Override
    public Session login(String email, String password) {

        User user = userRepository.findByEmail(email);

        //se l'utente esiste e password corrisponde
        if(user!=null && user.getPassword().equals(password)){


            Session session = new Session();
            session.setUser(user);
            session.setToken(Utility.generateToken());
            Session newSession = sessionRepository.save(session);

            return newSession;

            //se l'utente non esiste oppure se la password non corrisponde
        }else{
            return null;
        }
    }
}
