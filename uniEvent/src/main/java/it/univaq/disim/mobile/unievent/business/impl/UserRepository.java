package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * @author uniEvent
 */
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    User findById(Long id);

}
