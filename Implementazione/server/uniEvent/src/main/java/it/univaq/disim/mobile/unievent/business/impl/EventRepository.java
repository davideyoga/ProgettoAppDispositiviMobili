package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.event.ListDataEvent;
import java.util.List;

/**
 * @author Davide Micarelli
 */
public interface EventRepository extends JpaRepository<Event, Long> {


    //List<Event> findTopBy

}
