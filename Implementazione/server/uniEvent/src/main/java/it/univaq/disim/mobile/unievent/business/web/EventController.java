package it.univaq.disim.mobile.unievent.business.web;

import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.impl.UniEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

/**
 * @author Davide Micarelli
 */
@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private UniEventService service;

    @RequestMapping(value = "/event/create", produces = "application/json", method = RequestMethod.POST)
    public @ResponseBody
    Response createEvent(@RequestBody Event event) {

        this.service.createEvent(event);

        return Response.DEFAULT_RESPONSE_OK;
    }


    @GetMapping("/event/hot")
    public Response getHotEvent() {

        Response <List <Event>> result = new Response <>(true, Response.DEFAULT_RESPONSE_OK.getMessage());

        result.setData(this.service.findHotEvent());

        return result;
    }

    @GetMapping("/event/all")
    public Response getAllEvents(){

        Response <List <Event>> result = new Response <>(true, Response.DEFAULT_RESPONSE_OK.getMessage());

        result.setData(this.service.findAllEvents());

        return result;

    }

}