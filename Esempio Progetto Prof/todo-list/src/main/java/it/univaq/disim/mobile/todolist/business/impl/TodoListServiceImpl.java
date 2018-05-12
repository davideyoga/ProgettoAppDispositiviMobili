package it.univaq.disim.mobile.todolist.business.impl;

import it.univaq.disim.mobile.todolist.business.TodoListService;
import it.univaq.disim.mobile.todolist.business.domain.Session;
import it.univaq.disim.mobile.todolist.business.domain.Task;
import it.univaq.disim.mobile.todolist.business.domain.User;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TodoListServiceImpl implements TodoListService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Session login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            Session session = new Session();
            session.setUser(user);
            session.setToken(Utility.generateToken());
            Session newSession = sessionRepository.save(session);
            return newSession;
        } else {
            return null;
        }
    }

    @Override
    public void logout(String token) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            sessionRepository.delete(session);
        }
    }

    @Override
    public boolean createUser(User user) {
        User u = userRepository.findByUsername(user.getUsername());
        if (u != null) {
            return false;
        }
        userRepository.save(user);
        return true;
    }

    @Override
    public void updateUser(String token, User user) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            User oldUser = session.getUser();
            oldUser.setFirstname(user.getFirstname());
            oldUser.setLastname(user.getLastname());
            oldUser.setEmail(user.getEmail());
        }

    }

    @Override
    public Task createTask(String token, Task task) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            task.setUser(session.getUser());
            return taskRepository.save(task);
        }
        return null;
    }

    @Override
    public List<Task> findAllTasks(String token) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            /*
            Set<Task> tasks = session.getUser().getTasks();
            return Arrays.asList(tasks.toArray(new Task[0]));
            */
            return taskRepository.findByUserIdOrderByPosition(session.getUser().getId());
            
        } else {
            return new ArrayList<>();
        }

    }

    @Override
    public Task findTaskById(String token, Long id) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            Task task = taskRepository.findOne(id);
            if (task != null && task.getUser().getId() == session.getUser().getId()) {
                return task;
            }
        }
        return null;

    }

    @Override
    public Task updateTask(String token, Task newTask) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            Task task = taskRepository.findOne(newTask.getId());
            if (task != null && task.getUser().getId() == session.getUser().getId()) {
                task.setCompleted(newTask.isCompleted());
                task.setText(newTask.getText());
                task.setPosition(newTask.getPosition());
                return task;
            }
        }
        return null;
    }

    @Override
    public void deleteTask(String token, Long id) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            taskRepository.delete(id);
        }

    }

    @Override
    public void updateOrderTasks(String token, List<Task> tasks) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            for (Task task : tasks) {
                Task newTask = taskRepository.findOne(task.getId());
                if (newTask != null) {
                    newTask.setPosition(task.getPosition());
                }

            }
        }
    }

}
