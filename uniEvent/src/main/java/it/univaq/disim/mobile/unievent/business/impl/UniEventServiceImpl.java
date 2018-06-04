package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.*;
import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    private CategoryRepository categoryRepository;

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
    public Event findEventoById(Long id) {
     
        return eventRepository.findById(id).get(); //LE CAZZO DI DIPENDENZE PER LE OPERAZIONI CRUD
    }

    @Override
    public void createEvent(Event event){
        this.eventRepository.save(event);
    }

    @Override
    public List<Event> findHotEvent() {
        return eventRepository.findTop10ByOrderByViewsDesc();

    }

    @Override
    public List <Event> findAllEvents() {

        return eventRepository.findAll();
    }

    @Override
    public List<String> getCities() {

        List<String> cities = this.eventRepository.findDistinctCity();

        return cities;
    }

    @Override
    public List<Event> findEventsByCity(String city) {
        return this.eventRepository.findEventsByCity(city);
    }

    @Override
    public List <Event> findEventsByDate(Date date) {
        return this.eventRepository.findEventsByDate(date);
    }

    @Override
    public List <Event> findEventsByCategory(Category category) {
        return this.eventRepository.findEventsByCategories(category);
    }

    @Override
    public Category findCategoryByName(String name) {
        return this.categoryRepository.findByName(name);
    }

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }


    @Override
    public void save(User user){


        userRepository.save(user);

//        entityManager.persist(user);
//        entityManager.flush();
//
//        entityManager.unwrap(Session.class);

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

    public User findUserBySurname(String surname){

        return null;

    }

 
    }

