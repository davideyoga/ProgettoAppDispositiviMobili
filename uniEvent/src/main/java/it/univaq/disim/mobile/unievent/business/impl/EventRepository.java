package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.Category;
import it.univaq.disim.mobile.unievent.business.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Temporal;

import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

/**
 * @author Davide Micarelli
 */
public interface EventRepository extends JpaRepository<Event, Long> {

    Event findEventsById(Long id);

    List<Event> findTop10ByOrderByViewsDesc();

    @Query("SELECT DISTINCT e.city FROM Event e WHERE e.city IS NOT NULL")
    List<String> findDistinctCity();

    List<Event> findEventsByCity(String city);

    List<Event> findEventsByDate(Date date);

    List<Event> findEventsByCategories(Category category);

    List<Event> findEventsByDateAfterAndDateBefore(Date after, Date before);
}
