package it.univaq.disim.mobile.todolist.business;

import it.univaq.disim.mobile.todolist.business.domain.Session;
import it.univaq.disim.mobile.todolist.business.domain.Task;
import it.univaq.disim.mobile.todolist.business.domain.User;
import java.util.List;

public interface TodoListService {

    Session login(String username, String password);

    void logout(String token);

    boolean createUser(User user);

    void updateUser(String token, User user);

    Task createTask(String token, Task task);

    List<Task> findAllTasks(String username);

    Task findTaskById(String token, Long id);

    Task updateTask(String token, Task task);

    void deleteTask(String token, Long id);

    void updateOrderTasks(String token, List<Task> tasks);

}
