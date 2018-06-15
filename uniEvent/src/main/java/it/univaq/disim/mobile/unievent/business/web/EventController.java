package it.univaq.disim.mobile.unievent.business.web;

import it.univaq.disim.mobile.unievent.business.domain.Category;
import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.impl.UniEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

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

        System.out.println(category);

        return this.service.findEventsByCategory(category);
    }

    @GetMapping("/baseSearch/{nameCategory}/{city}/{date}")
    public Set<Event> getEventsByWhenWhereWhat(@PathVariable String nameCategory,
                                               @PathVariable String city,
                                               @PathVariable @DateTimeFormat(pattern="yyyy-MM-dd") Date date){

        List<Event> eventsByCategory = null;
        List<Event> eventsByDate = null;
        List<Event> eventsByCity = null;
        Set<Event> eventsTotal = new TreeSet <>();


        /*
            RACCOLTA DATI
         */
        if (nameCategory!=null && nameCategory.length() != 0) {

            Category category = this.service.findCategoryByName(nameCategory);

            eventsByCategory = this.service.findEventsByCategory( category );

            System.out.println("eventsByCategory: " + eventsByCategory);

            eventsTotal.addAll(eventsByCategory);
        }

        if (date!=null){

            eventsByDate = this.service.findEventsByDate(date);

            System.out.println("eventsByDate: " + eventsByDate);

            eventsTotal.addAll(eventsByDate);
        }

        if (city != null){

            eventsByCity = this.service.findEventsByCity(city);

            System.out.println("eventsByCity: " + eventsByCity);

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


}