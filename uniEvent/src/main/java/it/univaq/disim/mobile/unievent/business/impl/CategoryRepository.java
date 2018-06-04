package it.univaq.disim.mobile.unievent.business.impl;

import it.univaq.disim.mobile.unievent.business.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author Davide Micarelli
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {

        List<Category> findAll();

        Category findByName(String name);

}
