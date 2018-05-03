package it.univaq.disim.mobile.unievent.business.web;

import it.univaq.disim.mobile.unievent.business.domain.User;
import it.univaq.disim.mobile.unievent.business.domain.Session;

import it.univaq.disim.mobile.unievent.business.domain.UserPreference;
import it.univaq.disim.mobile.unievent.business.impl.UniEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author uniEvent
 */
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UniEventService service;

    @PostMapping("/user/create")
    public Response createUser(@RequestParam String email, @RequestParam String password) {

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);

        service.createUser(user);

        return Response.DEFAULT_RESPONSE_OK;
    }

    @PostMapping("/user/addUserPreference")
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
    public Response login(@RequestBody User user){

        //creo la sessione
        Session session = service.login(user.getEmail(), user.getPassword());

        //controllo se la sessione non e' diversa da null
        if(session!=null){


            Response<Login> result = new Response<>(true, Response.DEFAULT_RESPONSE_OK.getMessage());

            //setto l'oggetto login che va inserito nella risposta
            Login login = new Login();
            login.setToken(session.getToken());
            login.setEmail(session.getUser().getEmail());

            //inserisco il login nella risposta
            result.setData(login);

            return result;

        }else {
            return Response.DEFAULT_RESPONSE_KO;
        }
    }//FINE METODO LOGIN

}//FINE CLASSE
