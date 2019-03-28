package org.lucia.api.dismissal;

import org.lucia.model.dismissal.Dismissal;
import org.lucia.service.dismissal.DismissalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class DismissalResource {

    @Autowired
    private DismissalService dismissalService;

    @RequestMapping(value = "/dismissal", method = POST)
    @ResponseStatus(value = CREATED)
    @ResponseBody
    public Dismissal create(@RequestBody Dismissal dismissal) {
        return dismissalService.create(dismissal);
    }
}
