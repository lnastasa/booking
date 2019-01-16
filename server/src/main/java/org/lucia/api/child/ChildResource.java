package org.lucia.api.child;

import org.lucia.model.childs.Child;
import org.lucia.service.childs.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class ChildResource {

    @Autowired
    private ChildService childService;

    @RequestMapping(value = "/childs", method = POST)
    @ResponseStatus(value = CREATED)
    @ResponseBody
    public Child create(@RequestBody Child child) {
        return childService.create(child);
    }
}
