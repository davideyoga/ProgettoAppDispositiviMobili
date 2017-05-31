package model;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created by davide on 25/05/17.
 */
public class Event {

    private int id;
    private String name;
    private String image;
    private String description;
    private float price;
    private String address;
    private Timestamp dateCreation; // data di creazione
    private Timestamp date; //data in cui si svolge l'evento


    private User userCreator; // user ha creato l'evento

    private List<User> userFavorites; // lista di utenti che hanno l'evento nei loro preferiti

    private List<Partecipate> participations; // lista di partecipazioni

    private Category category;

    /**
     * Constructors with null values
     */
    public Event(){
        this.id = 0;
        this.name = null;
        this.image = null;
        this.description = null;
        this.price = 0;
        this.address = null;
        this.dateCreation = null;
        this.date = null;
    }


}
