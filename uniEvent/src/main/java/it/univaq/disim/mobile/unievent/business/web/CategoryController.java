package it.univaq.disim.mobile.unievent.business.web;

import it.univaq.disim.mobile.unievent.business.domain.Category;
import it.univaq.disim.mobile.unievent.business.impl.UniEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Davide Micarelli
 */
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private UniEventService service;

    @GetMapping("/all")
    public List<Category> getAllCategories() {

        return this.service.getCategories();
    }

}
