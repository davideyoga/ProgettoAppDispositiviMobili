package it.univaq.disim.mobile.todolist.business.impl;

import it.univaq.disim.mobile.todolist.business.domain.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Long> {

    Session findByToken(String token);

}
