package it.univaq.disim.mobile.unievent.business.web;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import it.univaq.disim.mobile.unievent.business.AdvanceSearch;
import it.univaq.disim.mobile.unievent.business.CustomerDateAndTimeDeserialize;
import it.univaq.disim.mobile.unievent.business.domain.Category;
import it.univaq.disim.mobile.unievent.business.domain.Event;
import it.univaq.disim.mobile.unievent.business.domain.Participate;
import it.univaq.disim.mobile.unievent.business.domain.User;
import it.univaq.disim.mobile.unievent.business.impl.UniEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.*;

/**
 * @author Davide Micarelli
 */
@RestController
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    private UniEventService service;

    @PostMapping("/create")
    @JsonDeserialize(using=CustomerDateAndTimeDeserialize.class)
    public boolean createEvent(@RequestBody Event event) {

        System.out.println("Event: " + event);

        this.service.createEvent(event);

        System.out.println("Evento creato");

        return true;
    }


    @GetMapping("/{id}")
    public Event findEventById(@PathVariable Long id) {

        Event event = service.findEventById(id);

        if(event.getViews()!=null) {
            event.setViews(event.getViews() + 1);
        }else{
            event.setViews(new Long(1));
        }
        service.updateEvent(event);

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



    //mi devo aspettare:
    // - prezzo min
    // - prezzo max
    // - una categoria
    // - una lista di servizi
    @PostMapping("/advanceSearch")
    public List<Event> advanceSearch(@RequestBody AdvanceSearch advanceSearch){

            System.out.println("advanceSearch: " + advanceSearch);

            List <Event> eventList = service.findAllEvents();

            List <Event> newList = new ArrayList <>();

            for (Event e : eventList) {

                System.out.println("event e: " + e);

                //controllo sul prezzo
                if (( e.getPrice() >= advanceSearch.getMinPrice() && e.getPrice() <= advanceSearch.getMaxPrice())
//                        &&
//                        (e.getCategories().get(0).getName().equals(advanceSearch.getCategory()) || advanceSearch.getCategory() == null) &&
//                        (e.getServices().containsAll(advanceSearch.getServiceList()) || advanceSearch.getServiceList() == null)
//

                        ) {

                    System.out.println("Aggiunto a new List l'evento: " + e);

                    newList.add(e);

                }
            }

            System.out.println("newList: " + newList);

            return newList;
    }


    @PostMapping("/eventRegisteredByUser")
    public List<Event> getEventRegisteredByToken(String token){


        List<Participate> participateList = this.service.findSessionByToken(token).getUser().getParticipation();

        List<Event> eventList = new ArrayList<>();

        for (Participate p : participateList){

            eventList.add(p.getEvent());

        }

        return eventList;
    }


    @PostMapping("/bookEvent")
    public boolean bookEvent(@RequestParam String token, @RequestParam Long idEvent){

        System.out.println("Laniato metodo book Event");

        Event event = service.findEventById(idEvent);

        User user = this.service.findSessionByToken(token).getUser();

        Participate participate = new Participate();
        participate.setEvent(event);
        participate.setUser(this.service.findSessionByToken(token).getUser());
        participate.setDataPrenotation(new Date(Calendar.getInstance().getTimeInMillis()));

        this.service.saveParticipate(participate);

        user.getParticipation().add(participate);

        this.service.save(user);

        event.getParticipation().add(participate);

        this.service.updateEvent(event);

        return true;
    }


}