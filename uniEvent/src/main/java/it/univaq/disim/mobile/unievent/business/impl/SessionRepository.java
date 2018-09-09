package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.Session;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Davide Micarelli
 */
public interface SessionRepository extends JpaRepository<Session, Long> {

    Session getSessionByToken(String token);

    //boolean removeByToken(String token);

    void deleteByToken(String token);

    Session findByToken(String token);

}
