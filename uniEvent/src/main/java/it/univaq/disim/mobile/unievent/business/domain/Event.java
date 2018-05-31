package it.univaq.disim.mobile.unievent.business.domain;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * @author Davide Micarelli
 */
@Entity
@Table(name="EVENT")
public class Event implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "TITLE", nullable = false )
    private String title;

    @Column(name = "IMAGE", nullable = true)
    private String image;

    @Column(name = "DESCRIPTION", nullable = true )
    private String description;

    @Column(name = "PRICE", nullable = true )
    private Float price;

    @Column(name = "ADDRESS", nullable = true )
    private String address;

    @Column(name = "CITY", nullable = true )
    private String city;

    @Column(name = "CIVIC_ADDRESS", nullable = true )
    private String civicAddress;

    @Column(name = "DATE", nullable = true )
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(name = "DATE_CREATION")
    @CreationTimestamp
    private Date dateCreation;

    @Column(name="VIEWS", nullable = false)
    private Long views = new Long(0);




    @ManyToOne
    private User creator;

    @OneToMany
    private List<Participate> participation;

    @ManyToMany
    private List<Category> categories;

    @ManyToMany
    private List<Service> services;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCivicAddress() {
        return civicAddress;
    }

    public void setCivicAddress(String civicAddress) {
        this.civicAddress = civicAddress;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public List <Participate> getParticipation() {
        return participation;
    }

    public void setParticipation(List <Participate> participation) {
        this.participation = participation;
    }

    public List <Category> getCategories() {
        return categories;
    }

    public void setCategories(List <Category> categories) {
        this.categories = categories;
    }

    public List <Service> getServices() {
        return services;
    }

    public void setServices(List <Service> services) {
        this.services = services;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Event event = (Event) o;

        if (getId() != null ? !getId().equals(event.getId()) : event.getId() != null) return false;
        if (getTitle() != null ? !getTitle().equals(event.getTitle()) : event.getTitle() != null) return false;
        if (getImage() != null ? !getImage().equals(event.getImage()) : event.getImage() != null) return false;
        if (getDescription() != null ? !getDescription().equals(event.getDescription()) : event.getDescription() != null)
            return false;
        if (getPrice() != null ? !getPrice().equals(event.getPrice()) : event.getPrice() != null) return false;
        if (getAddress() != null ? !getAddress().equals(event.getAddress()) : event.getAddress() != null) return false;
        if (getCity() != null ? !getCity().equals(event.getCity()) : event.getCity() != null) return false;
        if (getCivicAddress() != null ? !getCivicAddress().equals(event.getCivicAddress()) : event.getCivicAddress() != null)
            return false;
        if (getDate() != null ? !getDate().equals(event.getDate()) : event.getDate() != null) return false;
        if (getDateCreation() != null ? !getDateCreation().equals(event.getDateCreation()) : event.getDateCreation() != null)
            return false;
        if (getViews() != null ? !getViews().equals(event.getViews()) : event.getViews() != null) return false;
        if (getCreator() != null ? !getCreator().equals(event.getCreator()) : event.getCreator() != null) return false;
        if (getParticipation() != null ? !getParticipation().equals(event.getParticipation()) : event.getParticipation() != null)
            return false;
        if (getCategories() != null ? !getCategories().equals(event.getCategories()) : event.getCategories() != null)
            return false;
        return getServices() != null ? getServices().equals(event.getServices()) : event.getServices() == null;
    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getTitle() != null ? getTitle().hashCode() : 0);
        result = 31 * result + (getImage() != null ? getImage().hashCode() : 0);
        result = 31 * result + (getDescription() != null ? getDescription().hashCode() : 0);
        result = 31 * result + (getPrice() != null ? getPrice().hashCode() : 0);
        result = 31 * result + (getAddress() != null ? getAddress().hashCode() : 0);
        result = 31 * result + (getCity() != null ? getCity().hashCode() : 0);
        result = 31 * result + (getCivicAddress() != null ? getCivicAddress().hashCode() : 0);
        result = 31 * result + (getDate() != null ? getDate().hashCode() : 0);
        result = 31 * result + (getDateCreation() != null ? getDateCreation().hashCode() : 0);
        result = 31 * result + (getViews() != null ? getViews().hashCode() : 0);
        result = 31 * result + (getCreator() != null ? getCreator().hashCode() : 0);
        result = 31 * result + (getParticipation() != null ? getParticipation().hashCode() : 0);
        result = 31 * result + (getCategories() != null ? getCategories().hashCode() : 0);
        result = 31 * result + (getServices() != null ? getServices().hashCode() : 0);
        return result;
    }
}
