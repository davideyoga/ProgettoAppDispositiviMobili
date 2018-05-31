package it.univaq.disim.mobile.unievent.business.domain;

import javax.persistence.*;
import java.util.List;

/**
 * @author Davide Micarelli
 */
@Entity
@Table(name="SERVICE")
public class Service implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME", nullable = false )
    private String name;

    @Column(name = "DESCRIPTION", nullable = true)
    private String description;


    @ManyToMany(mappedBy = "services")
    private List<Event> eventsWithService;


    public List <Event> getEventsWithService() {
        return eventsWithService;
    }

    public void setEventsWithService(List <Event> eventsWithService) {
        this.eventsWithService = eventsWithService;
    }

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

    @Override
    public String toString() {
        return "Service{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Service service = (Service) o;

        if (getId() != null ? !getId().equals(service.getId()) : service.getId() != null) return false;
        if (getName() != null ? !getName().equals(service.getName()) : service.getName() != null) return false;
        return getDescription() != null ? getDescription().equals(service.getDescription()) : service.getDescription() == null;
    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getDescription() != null ? getDescription().hashCode() : 0);
        return result;
    }
}
