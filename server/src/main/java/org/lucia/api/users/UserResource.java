package org.lucia.api.users;

import org.lucia.model.users.RegistrationUpdate;
import org.lucia.model.users.User;
import org.lucia.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.ACCEPTED;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

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
}
