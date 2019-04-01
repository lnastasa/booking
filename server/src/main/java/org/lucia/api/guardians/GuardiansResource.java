package org.lucia.api.guardians;

import org.lucia.model.guardians.Guardian;
import org.lucia.service.guardians.GuardiansService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
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

    @RequestMapping(value = "/guardians", method = GET)
    @ResponseStatus(value = OK)
    @ResponseBody
    public List<Guardian> readByChildId(@RequestParam("childId") int childId) {
        return guardiansService.readByChildId(childId);
    }

    @RequestMapping(value = "/guardians/{id}", method = GET)
    @ResponseStatus(value = OK)
    @ResponseBody
    public Guardian readById(@PathVariable("id") long id) {
        return guardiansService.readById(id);
    }
}
