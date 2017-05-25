package model;

import java.sql.Timestamp;
import java.util.Set;

/**
 * Informazione che riguarda la prenotazione dell'utente ad un evento ed eventuale recensione
 * Created by davide on 25/05/17.
 */
public class Partecipate {

    private Timestamp datePrenotation;
    private int voteReview;
    private String descriptionReview;

    private User user; // utente che ha partecipato all'evento
    private Event event; // evento a cui ha partecipato l'evento

    /**
     * Constructors with null values
     */
    public Partecipate(){
        this.datePrenotation = null;
        this.voteReview = 0;
        this.descriptionReview = null;
        this.user = null;
        this.event = null;
    }

}
