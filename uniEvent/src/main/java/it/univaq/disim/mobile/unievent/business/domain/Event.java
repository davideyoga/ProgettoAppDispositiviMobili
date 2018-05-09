package it.univaq.disim.mobile.unievent.business.domain;

import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import java.util.Date;
import java.sql.Timestamp;

/**
 * @author Davide Micarelli
 */
@Entity
@Table(name="event")
public class Event implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "title", nullable = false )
    private String title;

    @Column(name = "image", nullable = true)
    private String image;

    @Column(name = "description", nullable = true )
    private String description;

    @Column(name = "price", nullable = true )
    private Float price;

    @Column(name = "address", nullable = true )
    private String address;

    @Column(name = "date", nullable = true )
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(name = "date_creation")
    @CreationTimestamp
    private Date dateCreation;


    @Column(name="views", nullable = false)
    private Long views;


    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", image='" + image + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", address='" + address + '\'' +
                ", dateCreation=" + dateCreation +
                ", date=" + date +
                '}';
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
        if (getDateCreation() != null ? !getDateCreation().equals(event.getDateCreation()) : event.getDateCreation() != null)
            return false;
        return getDate() != null ? getDate().equals(event.getDate()) : event.getDate() == null;
    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getTitle() != null ? getTitle().hashCode() : 0);
        result = 31 * result + (getImage() != null ? getImage().hashCode() : 0);
        result = 31 * result + (getDescription() != null ? getDescription().hashCode() : 0);
        result = 31 * result + (getPrice() != null ? getPrice().hashCode() : 0);
        result = 31 * result + (getAddress() != null ? getAddress().hashCode() : 0);
        result = 31 * result + (getDateCreation() != null ? getDateCreation().hashCode() : 0);
        result = 31 * result + (getDate() != null ? getDate().hashCode() : 0);
        return result;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }
}
