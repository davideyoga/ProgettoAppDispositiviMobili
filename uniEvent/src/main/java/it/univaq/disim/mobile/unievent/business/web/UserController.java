package it.univaq.disim.mobile.unievent.business.web;

import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.domain.Session;
import it.univaq.disim.mobile.unievent.business.domain.User;
import it.univaq.disim.mobile.unievent.business.domain.UserPreference;
import it.univaq.disim.mobile.unievent.business.impl.UniEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author uniEvent
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UniEventService service;

    @PostMapping("/create")
    public Response createUser(@RequestParam String email, @RequestParam String password) {

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);

        service.createUser(user);

        return Response.DEFAULT_RESPONSE_OK;
    }

    @PostMapping("/addUserPreference")
    public Response addUserPreference(@RequestParam String emailUser, @RequestParam String namePreference) {

        User user = service.findUserByEmail(emailUser);

        UserPreference userPreference = service.findUserPreferenceByName(namePreference);

        user.getUserPreferences().add(userPreference);

        service.save(user);

        return Response.DEFAULT_RESPONSE_OK;

    }


    /**
     * @param user: utente inviato dal client per effettuare il login
     * @return risposta
     */
    @PostMapping("/login")
    public Login login(@RequestBody User user){

        //creo la sessione
        Session session = service.login(user.getEmail(), user.getPassword());

        //controllo se la sessione non e' diversa da null
        if(session!=null){

            //setto l'oggetto login che va inserito nella risposta
            Login login = new Login();
            login.setToken(session.getToken());
            login.setEmail(session.getUser().getEmail());

            System.out.println(login);

            return login;

        }else {
            return null;
        }
    }//FINE METODO LOGIN


    /**
     * @param token: token dell'utente da sloggare
     * @return risposta
     */
    @PostMapping("/logout")
    public Boolean logout(@RequestBody String token){

        //creo la sessione
        service.logout(token);

        return true;

    }//FINE METODO LOGOUT

    /*
    {             "password": "d.micarelli", "email": "d.micarelli7@gmail.com"  }
     */


    @GetMapping("/userCreatedEvent/{idEvent}")
    public User getUserByEventId(@PathVariable Long idEvent){

        Event event = this.service.findEventById(idEvent);

        return event.getCreator();

        //return this.service.findUserByIdEvent(idEvent);

    }

}//FINE CLASSE
