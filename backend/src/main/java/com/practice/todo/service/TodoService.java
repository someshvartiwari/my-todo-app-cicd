package com.practice.todo.service;

import com.practice.todo.entity.Todo;
import com.practice.todo.repository.TodoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository repository;

    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    public List<Todo> getAll() {
        return repository.findAll();
    }

    public Todo create(Todo todo) {
        todo.setId(null);
        return repository.save(todo);
    }

    public Todo update(Long id, Todo request) {
        Todo existing = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));
        existing.setTitle(request.getTitle());
        existing.setCompleted(request.isCompleted());
        return repository.save(existing);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found");
        }
        repository.deleteById(id);
    }
}
