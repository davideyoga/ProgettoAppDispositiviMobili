package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @author uniEvent
 */
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

//    @Query("select user " +
//            "from Event event" +
//            "join user_events_created.events_crearted_id " +
//            "where events_crearted_id = :id")
//    User findBy()

}
