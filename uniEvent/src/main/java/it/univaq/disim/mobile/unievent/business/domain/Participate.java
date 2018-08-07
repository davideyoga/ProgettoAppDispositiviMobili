package it.univaq.disim.mobile.unievent.business.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * @author Davide Micarelli
 */
@Entity
@Table(name = "PARTICIPATE")
public class Participate implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID", nullable = false)
    private Long id;

    @Column(name = "DATA_PRENOTATION", nullable = false)
    private Date dataPrenotation;

    @Column(name = "VOTE_REVIEW", nullable = true)
    private Integer voteReview;

    @Column(name = "DESCRIPTION_REVIEW", nullable = true)
    private String descriptionReview;


    @OneToOne
    private User user;

    @OneToOne
    private Event event;


    /*
     * GETTER AND SETTER
     */
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDataPrenotation() {
        return dataPrenotation;
    }

    public void setDataPrenotation(Date dataPrenotation) {
        this.dataPrenotation = dataPrenotation;
    }

    public Integer getVoteReview() {
        return voteReview;
    }

    public void setVoteReview(Integer voteReview) {
        this.voteReview = voteReview;
    }

    public String getDescriptionReview() {
        return descriptionReview;
    }

    public void setDescriptionReview(String descriptionReview) {
        this.descriptionReview = descriptionReview;
    }

    @Override
    public String toString() {
        return "Participate{" +
                "id=" + id +
                ", dataPrenotation=" + dataPrenotation +
                ", voteReview=" + voteReview +
                ", descriptionReview='" + descriptionReview + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Participate that = (Participate) o;

        if (getId() != null ? !getId().equals(that.getId()) : that.getId() != null) return false;
        if (getDataPrenotation() != null ? !getDataPrenotation().equals(that.getDataPrenotation()) : that.getDataPrenotation() != null)
            return false;
        if (getVoteReview() != null ? !getVoteReview().equals(that.getVoteReview()) : that.getVoteReview() != null)
            return false;
        return getDescriptionReview() != null ? getDescriptionReview().equals(that.getDescriptionReview()) : that.getDescriptionReview() == null;
    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getDataPrenotation() != null ? getDataPrenotation().hashCode() : 0);
        result = 31 * result + (getVoteReview() != null ? getVoteReview().hashCode() : 0);
        result = 31 * result + (getDescriptionReview() != null ? getDescriptionReview().hashCode() : 0);
        return result;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
