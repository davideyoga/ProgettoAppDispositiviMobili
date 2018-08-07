package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.Participate;
import it.univaq.disim.mobile.unievent.business.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


/**
 * @author Davide Micarelli
 */
public interface ParticipateRepository extends JpaRepository<Participate, Long> {


    List<Participate> getParticipateByUser(User user);


}
