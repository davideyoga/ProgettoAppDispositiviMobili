package it.univaq.disim.mobile.unievent.business.web;

import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.impl.UniEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;

/**
 * @author Davide Micarelli
 */
@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private UniEventService service;

    @PostMapping("/event/create")
    public Response createEvent(@RequestBody Event event) {

        this.service.createEvent(event);

        return Response.DEFAULT_RESPONSE_OK;
    }
}
