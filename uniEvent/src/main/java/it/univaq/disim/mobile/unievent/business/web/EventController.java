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
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    private UniEventService service;

    @RequestMapping(value = "/create", produces = "application/json", method = RequestMethod.POST)
    public void createEvent(@RequestBody Event event) {

        this.service.createEvent(event);
    }

    @GetMapping("/hot")
    public List<Event> getHotEvent() {

        System.out.println("\n");
        System.out.println("\n");
        System.out.println(this.service.findHotEvent());
        System.out.println("\n");
        System.out.println("\n");

        return this.service.findHotEvent();
    }

    @GetMapping("/all")
    public List<Event> getAllEvents(){

        return this.service.findAllEvents();

    }

    @GetMapping("/city")
    public List<String> getAllCity(){

        return this.service.getCities();
    }


//    @GetMapping("/event/hot")
//    public Response getHotEvent() {
//
//        System.out.println("Chiamato metodo getHotEvent");
//
//        Response <List <Event>> result = new Response <>(true, Response.DEFAULT_RESPONSE_OK.getMessage());
//
//        result.setData(this.service.findHotEvent());
//
//        return result;
//    }



//    @GetMapping("/event/all")
//    public Response getAllEvents(){
//
//        Response <List <Event>> result = new Response <>(true, Response.DEFAULT_RESPONSE_OK.getMessage());
//
//        result.setData(this.service.findAllEvents());
//
//        return result;
//
//    }



}