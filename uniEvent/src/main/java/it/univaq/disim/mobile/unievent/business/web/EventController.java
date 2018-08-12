package it.univaq.disim.mobile.unievent.business.web;

import it.univaq.disim.mobile.unievent.business.domain.Category;
import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.impl.UniEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

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

    @GetMapping("/{id}")
    public Event findEventById(@PathVariable Long id) {
		return service.findEventById(id);
	}
        
    @GetMapping("/hot")
    public List<Event> getHotEvent() {

        System.out.println("EVENTI SUPER HOT");

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

    @GetMapping("/eventByCity/{city}")
    public List<Event> getEventsByCity(@PathVariable String city){

        return this.service.findEventsByCity(city);
    }

    @GetMapping("/eventByCategory/{categoryName}")
    public List<Event> getEventsByCategory(@PathVariable String categoryName){

        Category category = this.service.findCategoryByName(categoryName);

        return this.service.findEventsByCategory(category);
    }

    @GetMapping("/baseSearch/{nameCategory}/{city}/{date}")
    public Set<Event> getEventsByWhenWhereWhat(@PathVariable(required=false) String nameCategory,
                                               @PathVariable(required=false) String city,
                                               @PathVariable(required=false) @DateTimeFormat(pattern="yyyy-MM-dd") Date date){

        System.out.println("\n");
        System.out.println("date: " + date);


        List<Event> eventsByCategory = null;
        List<Event> eventsByDate = null;
        List<Event> eventsByCity = null;
        Set<Event> eventsTotal = new TreeSet <>();


        /*
        
        RACCOLTA DATI
            
        ATTENZIONE: AGGIUNGERE UN ELSE AD OGNI IF PER GESTIONE SINGOLI CAMPI NULLI, PENA ERRORE NELLA RICHIESTA
        
        */
        if (nameCategory!=null && nameCategory.length() != 0) {

            Category category = this.service.findCategoryByName(nameCategory);

            System.out.println("category: " + category);

            eventsByCategory = this.service.findEventsByCategory( category );

            System.out.println("eventsByCategory: " + eventsByCategory);

            eventsTotal.addAll(eventsByCategory);

            System.out.println("eventsTotal1: " + eventsTotal);
        }
        else if(nameCategory==null){
            
            eventsByCategory = null;
            eventsTotal.addAll(eventsByCategory);
        }

        if (date!=null){

            //setto il giorno successivo meno un millisecondo
            Date endDay = new Date(date.getTime()+ 86400000-1);

            System.out.println("andDay: " + endDay);

            eventsByDate = this.service.findEventsByDateBeforeBetween(date, endDay);

            System.out.println("eventsByDate: " + eventsByDate);
            System.out.println("\n");

            eventsTotal.addAll(eventsByDate);

            System.out.println("eventsTotal2: " + eventsTotal);
        }
        else{
            
            
        }

        if (city != null){

            eventsByCity = this.service.findEventsByCity(city);

            eventsTotal.addAll(eventsByCity);

            System.out.println("eventsTotal3: " + eventsTotal);
        }
       else{
            
            eventsByCity = null;
            eventsTotal.addAll(eventsByCity);
        
        }
       
        /*
            FINE RACCOLTA DATI
         */




        if (eventsTotal.size()>0){

            if (eventsByCategory != null) {
                eventsTotal.retainAll(eventsByCategory);
            }

            if (eventsByDate != null) {
                eventsTotal.retainAll(eventsByDate);
            }

            if (eventsByCity != null) {
                eventsTotal.retainAll(eventsByCity);
            }

            return eventsTotal;

        }else{
            return null;
        }




    }


    @GetMapping("/EventCreatedByUser/{idUser}")
    public List<Event> getEventCreatedByUser(@PathVariable Long idUser){

        return service.findUserById(idUser).getEventsCreated();

    }



    @GetMapping("/image/{id}")
    public File getImageByEvent( @PathVariable Long id){

        System.out.println("\n");
        System.out.println("Arrivata chiamata a getimageByEvent");
        System.out.println("\n");

        Event event = this.service.findEventById(id);

        String route = event.getImage();

        File in = new File(route);

        System.out.println("Space in: " + in.getTotalSpace());

        return in;
    }


}