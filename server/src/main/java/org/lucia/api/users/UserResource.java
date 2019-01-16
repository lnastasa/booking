package org.lucia.api.users;

import org.lucia.model.users.RegistrationUpdate;
import org.lucia.model.users.Type;
import org.lucia.model.users.User;
import org.lucia.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@Controller
public class UserResource {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/users", method = POST)
    @ResponseStatus(value = CREATED)
    @ResponseBody
    public User create(@RequestBody User user) {
        return userService.create(user);
    }

    @RequestMapping(value = "/users/register", method = PUT)
    @ResponseStatus(value = ACCEPTED)
    @ResponseBody
    public void completeRegistration(@RequestBody RegistrationUpdate registrationUpdate) {
        userService.completeRegistration(registrationUpdate);
    }

    @RequestMapping(value = "/users/{type}", method = GET)
    @ResponseStatus(value = OK)
    @ResponseBody
    public List<User> readByType(@PathVariable("type") Type type) {
        return userService.readByType(type);
    }

    @RequestMapping(value = "/users/{type}/{id}", method = GET)
    @ResponseStatus(value = OK)
    @ResponseBody
    public User readById(@PathVariable("type") Type type, @PathVariable("id") long id) {
        return userService.readById(id);
    }
}
