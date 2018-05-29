package it.univaq.disim.mobile.unievent.business.domain;

import javax.persistence.*;
import java.util.List;

/**
 * @author Davide Micarelli
 */
@Entity
@Table(name = "category")
public class Category implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name", nullable = true )
    private String name;

    @Column(name = "description", nullable = true)
    private String description;


    @ManyToMany
    private List<Event> events;

}
