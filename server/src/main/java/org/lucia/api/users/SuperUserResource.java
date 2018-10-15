package org.lucia.api.users;

import org.lucia.model.users.SuperUser;
import org.lucia.model.users.Type;
import org.lucia.service.users.SuperUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class SuperUserResource {

    @Autowired
    private SuperUserService superUserService;

    @RequestMapping(value = "users/super-user", method = POST)
    @ResponseStatus(value = CREATED)
    public SuperUser create(SuperUser superUser) {
        superUser.setType(Type.SUPER_USER);
        return superUserService.create(superUser);
    }
}
