package org.lucia.api.users;

import org.lucia.model.users.Administrator;
import org.lucia.service.users.AdministratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class AdministratorResource {

    @Autowired
    private AdministratorService administratorService;

    @RequestMapping(value = "/users/administrator", method = POST)
    @ResponseStatus(value = CREATED)
    @ResponseBody
    public Administrator create(@RequestBody Administrator administrator) {
        return administratorService.create(administrator);
    }
}
