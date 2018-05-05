package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Davide Micarelli
 */
public interface EventRepository extends JpaRepository<Event, Long> {

}
