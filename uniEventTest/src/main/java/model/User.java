package model;

import java.util.Set;

/**
 * Created by davide on 25/05/17.
 */
public class User {

    private String email;
    private String name;
    private String surname;
    private String password;
    private int age;
    private String addres;
    private int telephoneNumber;

    private Set<UserPreference> userPreferences; // lista di preferenze dell'utente

    private Set<Event> createdEvents; // eventi creati dall'utente

    private Set<Event> eventFavorites; // eventi che l'utente ha inserito nei preferiti

    private Set<Partecipate> participateEvents; // lista di partecipazioni riguardante l'utente

    /**
     * Constructors with null values
     */
    public User(){
        this.email = null;
        this.name = null;
        this.surname = null;
        this.password = null;
        this.age = 0;
        this.addres = null;
        this.telephoneNumber = 0;
        this.userPreferences = null;
        this.createdEvents = null;
        this.eventFavorites = null;
        this.participateEvents = null;
    }

    /**
     * Created by davide on 25/05/17.
     */
    public static class UserPreference {

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
}
