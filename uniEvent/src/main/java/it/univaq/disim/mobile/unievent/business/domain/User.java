package it.univaq.disim.mobile.unievent.business.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author uniEvent
 */
@Entity
@Table(name = "USER")
public class User implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME", nullable = true )
    private String name;

    @Column(name = "SURNAME", nullable = true)
    private String surname;

    @Column(name = "EMAIL", nullable = false)
    private String email;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "AGE", nullable = true)
    private Integer age;

    @Column(name = "ADDRESS", nullable = true)
    private String address;

    @Column(name = "TELEPHONE_NUMBER", nullable = true)
    private Integer telephoneNumber;

    @Column(name = "DESCRIPTION", nullable = true)
    private String description;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<UserPreference> userPreferences = new ArrayList<>();

    @OneToMany
    private List<Participate> participation;



    @OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true,  fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Event> eventsCreated = new ArrayList<>();



    @ManyToMany
    private List<Event> preferredEvents = new ArrayList<>();


    /*
        GETTER AND SETTER
     */

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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(Integer telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public List <UserPreference> getUserPreferences() {
        return userPreferences;
    }

    public void setUserPreferences(List <UserPreference> userPreferences) {
        this.userPreferences = userPreferences;
    }

    @OneToMany(cascade=CascadeType.ALL, mappedBy="employer")
    public List <Event> getEventsCreated() {
        return eventsCreated;
    }

    public void setEventsCreated(List <Event> eventsCreated) {
        this.eventsCreated = eventsCreated;
    }

    public List <Event> getPreferredEvents() {
        return preferredEvents;
    }

    public void setPreferredEvents(List <Event> preferredEvents) {
        this.preferredEvents = preferredEvents;
    }

    public List <Participate> getParticipation() {
        return participation;
    }

    public void setParticipation(List <Participate> participation) {
        this.participation = participation;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (getId() != null ? !getId().equals(user.getId()) : user.getId() != null) return false;
        if (getName() != null ? !getName().equals(user.getName()) : user.getName() != null) return false;
        if (getSurname() != null ? !getSurname().equals(user.getSurname()) : user.getSurname() != null) return false;
        if (getEmail() != null ? !getEmail().equals(user.getEmail()) : user.getEmail() != null) return false;
        if (getPassword() != null ? !getPassword().equals(user.getPassword()) : user.getPassword() != null)
            return false;
        if (getAge() != null ? !getAge().equals(user.getAge()) : user.getAge() != null) return false;
        if (getAddress() != null ? !getAddress().equals(user.getAddress()) : user.getAddress() != null) return false;
        return getTelephoneNumber() != null ? getTelephoneNumber().equals(user.getTelephoneNumber()) : user.getTelephoneNumber() == null;
    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getSurname() != null ? getSurname().hashCode() : 0);
        result = 31 * result + (getEmail() != null ? getEmail().hashCode() : 0);
        result = 31 * result + (getPassword() != null ? getPassword().hashCode() : 0);
        result = 31 * result + (getAge() != null ? getAge().hashCode() : 0);
        result = 31 * result + (getAddress() != null ? getAddress().hashCode() : 0);
        result = 31 * result + (getTelephoneNumber() != null ? getTelephoneNumber().hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", age=" + age +
                ", address='" + address + '\'' +
                ", telephoneNumber=" + telephoneNumber +
                '}';
    }




}
