package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author uniEvent
 */
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    User findById(Long id);

}
