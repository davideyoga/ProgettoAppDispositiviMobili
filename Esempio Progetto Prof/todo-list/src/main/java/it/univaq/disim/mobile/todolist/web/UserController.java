package it.univaq.disim.mobile.todolist.web;

import it.univaq.disim.mobile.todolist.business.TodoListService;
import it.univaq.disim.mobile.todolist.business.domain.Session;
import it.univaq.disim.mobile.todolist.business.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private TodoListService service;

    @PostMapping("/login")
    public Response login(@RequestBody User u) {
        Session session = service.login(u.getUsername(), u.getPassword());
        if (session != null) {
            Response<Login> result = new Response<>(true, Response.DEFAULT_RESPONSE_OK.getMessage());
            Login login = new Login();
            login.setToken(session.getToken());
            login.setUsername(session.getUser().getUsername());
            login.setFirstname(session.getUser().getFirstname());
            login.setLastname(session.getUser().getLastname());
            login.setEmail(session.getUser().getEmail());
            result.setData(login);
            return result;
        } else {
            return Response.DEFAULT_RESPONSE_KO;
        }

    }

    @GetMapping("/logout/{token}")
    public Response logout(@PathVariable String token) {
        service.logout(token);
        return Response.DEFAULT_RESPONSE_OK;
    }

    @PostMapping("/users")
    public Response createUser(@RequestBody User user) {
        boolean result = service.createUser(user);
        Response<Object> response = new Response<>();
        response.setResult(result);
        if (result) {
            response.setMessage("Ok");
        } else {
            response.setMessage("User already exist");
        }
        return response;
    }

    @PutMapping("/users/{token}")
    public Response updateUser(@RequestBody User user, @PathVariable String token) {
        service.updateUser(token, user);
        return Response.DEFAULT_RESPONSE_OK;
    }

}
