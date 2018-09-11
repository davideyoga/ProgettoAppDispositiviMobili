package it.univaq.disim.mobile.unievent.business.web;

import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.domain.Session;
import it.univaq.disim.mobile.unievent.business.domain.User;
import it.univaq.disim.mobile.unievent.business.domain.UserPreference;
import it.univaq.disim.mobile.unievent.business.impl.UniEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

/**
 * @author uniEvent
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UniEventService service;

    @PostMapping("/create")
    public Login createUser(@RequestBody User user) {

        System.out.println("user: " + user);

        //User newUser = user;

        service.createUser(user);
        Session session = service.login(user.getEmail(), user.getPassword());

        Login login = new Login();
        login.setUser(session.getUser());
        login.setToken(session.getToken());

        return login;
    }

    @PostMapping("/updateUser")
    public User updateUser(@RequestBody User user){

        this.service.save(user);

        return user;
    }


    @PostMapping("/addUserPreference")
    public boolean addUserPreference(@RequestParam String emailUser, @RequestParam String namePreference) {

        User user = service.findUserByEmail(emailUser);

        UserPreference userPreference = service.findUserPreferenceByName(namePreference);

        user.getUserPreferences().add(userPreference);

        service.save(user);

        return true;

    }




    /**
     * @param user: utente inviato dal client per effettuare il login
     * @return risposta
     */
    @PostMapping("/login")
    public Login login(@RequestBody User user){

        System.out.println("user: " + user);

        //creo la sessione
        Session session = service.login(user.getEmail(), user.getPassword());

        System.out.println("session: " + session);

        //controllo se la sessione non e' diversa da null
        if(session!=null){

            //setto l'oggetto login che va inserito nella risposta
            Login login = new Login();
            login.setToken(session.getToken());
            login.setUser(session.getUser());

            System.out.println("login: " + login);
            return login;

        }else {
            System.out.println("fail fail fail fail fail");
            return null;
        }
    }//FINE METODO LOGIN


    /**
     * @param token: token dell'utente da sloggare
     * @return risposta
     */
    @PostMapping("/logout")
    public Boolean logout(@RequestParam  String token){

        //elimino sessione
        service.logout(token);

        return true;

    }//FINE METODO LOGOUT


    @GetMapping("/userCreatedEvent/{idEvent}")
    public User getUserByEventId(@PathVariable Long idEvent){

        Event event = this.service.findEventById(idEvent);

        return event.getCreator();

    }


    @GetMapping("/addUserFavorite/{token}/{idEvent}")
    public boolean addUserFavorite(@PathVariable String token, @PathVariable Long idEvent) {

        System.out.println("addUserFavorite lanciato");

        Event event = this.service.findEventById(idEvent);

        User user = this.service.findSessionByToken(token).getUser();

        if(user.getPreferredEvents()==null || !user.getPreferredEvents().contains(event)){
            user.getPreferredEvents().add(event);

            service.save(user);

            return true;
        }else{
            return false;
        }


    }

    //removeUserFavorite
    @GetMapping("/removeUserFavorite/{token}/{idEvent}")
    public boolean removeUserFavorite(@PathVariable String token, @PathVariable Long idEvent) {

        System.out.println("removeUserFavorite lanciato");

        Event event = this.service.findEventById(idEvent);

        User user = this.service.findSessionByToken(token).getUser();

        System.out.println("user.getPreferredEvents(): " + user.getPreferredEvents());

        user.getPreferredEvents().remove(event);

        service.save(user);

        return true;

    }



}//FINE CLASSE
