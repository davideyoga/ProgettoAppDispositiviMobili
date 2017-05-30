package model;

import java.util.Set;

/**
 * Created by davide on 25/05/17.
 */
public class Category {

    private int id;
    private String name;
    private String description;

    private Set<Event> events;

    /**
     * Constructors with null values
     */
    public Category(){
        this.id = 0;
        this.name = null;
        this.description = null;
        this.events = null;
    }

}
