package model;

import java.util.Set;

/**
 * Created by davide on 25/05/17.
 */
public class Service {

    private int id;
    private String name;
    private String description;

    private Set<Event> events; // eventi che hanno questo servizio

    /**
     * Constructors with null values
     */
    public Service(){
        this.id = 0;
        this.name = null;
        this.description = null;
        this.events = null;
    }
}
