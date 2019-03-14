package org.lucia.api.exceptions;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(value=HttpStatus.BAD_REQUEST)
    public void handleIllegalArgument(IllegalArgumentException e) {
        e.printStackTrace();
    }

    @ExceptionHandler(EmptyResultDataAccessException.class)
    @ResponseStatus(value=HttpStatus.NOT_FOUND)
    public void handleEmptyResultDataAccessException(EmptyResultDataAccessException e) {
        e.printStackTrace();
    }
}
