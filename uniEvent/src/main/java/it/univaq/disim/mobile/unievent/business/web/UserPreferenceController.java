package it.univaq.disim.mobile.unievent.business.web;

import it.univaq.disim.mobile.unievent.business.domain.User;
import it.univaq.disim.mobile.unievent.business.domain.UserPreference;
import it.univaq.disim.mobile.unievent.business.impl.UniEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author uniEvent
 */
@RestController
@RequestMapping("/api")
public class UserPreferenceController {

    @Autowired
    private UniEventService service;

    @PostMapping("/userPreference/create")
    public Response createUser(@RequestParam String name, @RequestParam String description) {

        UserPreference userPreference = new UserPreference();
        userPreference.setName(name);
        userPreference.setDescription(description);

        service.createUserPreference(userPreference);

        return Response.DEFAULT_RESPONSE_OK;
    }

}
