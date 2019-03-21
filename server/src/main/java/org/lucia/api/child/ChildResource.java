package org.lucia.api.child;

import org.lucia.model.childs.Child;
import org.lucia.service.childs.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
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

    @RequestMapping(value = "/childs", method = GET)
    @ResponseStatus(value = OK)
    @ResponseBody
    public List<Child> readByParentId(@RequestParam("parentId") long parentId) {
        return childService.readByParentId(parentId);
    }

    @RequestMapping(value = "/childs/{id}", method = GET)
    @ResponseStatus(value = OK)
    @ResponseBody
    public Child readById(@PathVariable("id") long id) {
        return childService.readById(id);
    }
}
