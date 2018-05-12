package it.univaq.disim.mobile.todolist.web;

import it.univaq.disim.mobile.todolist.business.TodoListService;
import it.univaq.disim.mobile.todolist.business.domain.Task;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TodoListService service;

    @PostMapping("/{token}")
    public Response createTask(@PathVariable(value = "token") String token, @RequestBody Task task) {
        service.createTask(token, task);
        Response<Task> response = new Response<>(true, "task created!");
        response.setData(task);
        return response;
    }

    @GetMapping("/{token}")
    public Response findAllTasks(@PathVariable(value = "token") String token) {
        List<Task> tasks = service.findAllTasks(token);
        Response<List<Task>> response = new Response<>(true, "all tasks");
        response.setData(tasks);
        return response;
    }

    @GetMapping("/{token}/{id}")
    public Response findTaskById(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id) {
        Task task = service.findTaskById(token, id);
        Response<Task> response = new Response<>(true, "task by id");
        response.setData(task);
        return response;
    }

    @PutMapping("/{token}/{id}")
    public Response updateTask(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id, @RequestBody Task task) {
        task.setId(id);
        Task newTask = service.updateTask(token, task);
        Response<Task> response = new Response<>(true, "task updated");
        response.setData(newTask);
        return response;
    }

    @DeleteMapping("/{token}/{id}")
    public Response deleteTask(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id) {
        service.deleteTask(token, id);
        Response<Object> response = new Response<>(true, "task deleted");

        return response;
    }

    @PostMapping("/{token}/order")
    public Response updateOrder(@PathVariable(value = "token") String token, @RequestBody Order[] orders) {
        List<Task> tasks = new ArrayList<>();
        for (Order order : orders) {
            Task task = new Task();
            task.setId(order.getId());
            task.setPosition(order.getPosition());
            tasks.add(task);
        }
        service.updateOrderTasks(token, tasks);

        Response<Object> response = new Response<>(true, "orders updated!");
        return response;
    }
}
