package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.Category;
import it.univaq.disim.mobile.unievent.business.domain.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author Davide Micarelli
 */
public interface ServiceRepository extends JpaRepository<Service, Long> {
}
