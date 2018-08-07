package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

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

    @Autowired
    private ParticipateRepository participateRepository;

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
    public Event findEventById(Long id) {
     
        return eventRepository.findEventsById(id);
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
    public List <Event> findEventsByDateBeforeBetween(Date start, Date end) {
        return this.eventRepository.findEventsByDateAfterAndDateBefore(start, end);
    }


    @Override
    public List <Event> findEventsByCategory(Category category) {
        return this.eventRepository.findEventsByCategories(category);
    }

    @Override
    public Category findCategoryByName(String name) {
        return this.categoryRepository.findCategoryByName(name);
    }

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public double getReviewValueUser(Long idUser) {

        //estraggo l'utente di cui voglio le recensioni dei suoi eventi
        User user = this.userRepository.findById(idUser);

        //estraggo tutti gli eventi dell'utente
        List<Event> listaEventiDellUtente = user.getEventsCreated();

        List<Participate> listaPartecipazioniEvento = this.participateRepository.getParticipateByUser(user);

        //estraggo le partecipazioni all'evento e faccio la media delle recensioni
        for (Event event : listaEventiDellUtente){

            List<Participate> partecipazioni = event.getParticipation();

            listaPartecipazioniEvento.addAll(partecipazioni);

        }

        //List<Participate> listaPartecipazioniEvento = this.participateRepository.getParticipateByUser(user);

        System.out.println("listaPartecipazioniEvento: " + listaPartecipazioniEvento);

        double totValue = 0;
        int count = 0;

        for (Participate participate : listaPartecipazioniEvento){

            if(participate.isExistReview() || participate.getVoteReview() > 0) {
                totValue = totValue + participate.getVoteReview();
                count++;
            }
        }

        System.out.println("count: " + count);

        System.out.println("ValoreDiritorno: " + totValue / count);

        return totValue / count;
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
    public User findUserByIdEvent(Long id) {
        return null;
    }

    @Override
    public User findUserById(Long idUser) {
        return this.userRepository.findById(idUser);
    }

    @Override
    public void logout(String token) {

        System.out.println("token: " + token);

        sessionRepository.deleteByToken(token);

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

