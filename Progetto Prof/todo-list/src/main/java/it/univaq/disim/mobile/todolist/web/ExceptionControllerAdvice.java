package it.univaq.disim.mobile.todolist.web;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(Exception.class)
    public Response exception(Exception e) {
        Response<Object> result = new Response<>(false, "error=" + e.getMessage());
        return result;
    }
}
