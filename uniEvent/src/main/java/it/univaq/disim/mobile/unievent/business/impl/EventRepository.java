package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author Davide Micarelli
 */
public interface EventRepository extends JpaRepository<Event, Long> {


    List<Event> findTop10ByOrderByViewsDesc();

    @Query("SELECT DISTINCT e.city FROM Event e WHERE e.city IS NOT NULL")
    List<String> findDistinctCity();

}
