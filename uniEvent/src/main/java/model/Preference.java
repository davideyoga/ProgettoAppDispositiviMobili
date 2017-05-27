package model;

import java.util.Set;

/**
 * Created by davide on 25/05/17.
 */
public class UserPreference {

    private int id;
    private String name;
    private String description;

    private Set<User> users; // lista di utenti che possiedono tale preferenza

    /**
     * Constructors with null values
     */
    public UserPreference(){
        this.id = 0;
        this.name = null;
        this.description = null;
        this.users = null;
    }

}
