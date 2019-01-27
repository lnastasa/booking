package org.lucia.api.guardians;

import org.lucia.model.guardians.Guardian;
import org.lucia.service.guardians.GuardiansService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class GuardiansResource {

    @Autowired
    private GuardiansService guardiansService;

    @RequestMapping(value = "/guardians", method = POST)
    @ResponseStatus(value = CREATED)
    @ResponseBody
    public Guardian create(@RequestBody Guardian guardian) {
        return guardiansService.create(guardian);
    }
}
