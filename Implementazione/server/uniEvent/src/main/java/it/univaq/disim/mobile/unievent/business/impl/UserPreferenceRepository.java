package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author  Davide Micarelli
 */
public interface UserPreferenceRepository extends JpaRepository<UserPreference, Long> {

    UserPreference findByName( String name);
}
