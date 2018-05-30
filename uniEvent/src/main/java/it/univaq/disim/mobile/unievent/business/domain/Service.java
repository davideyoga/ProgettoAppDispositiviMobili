package it.univaq.disim.mobile.unievent.business.domain;

import javax.persistence.*;
import java.util.List;

/**
 * @author Davide Micarelli
 */
@Entity
@Table(name="service")
public class Service implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false )
    private String name;

    @Column(name = "description", nullable = true)
    private String description;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
