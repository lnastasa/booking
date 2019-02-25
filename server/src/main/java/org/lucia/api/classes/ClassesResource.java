package org.lucia.api.classes;

import org.lucia.model.childs.Child;
import org.lucia.model.classes.Clazz;
import org.lucia.service.classes.ClassesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class ClassesResource {

    @Autowired
    private ClassesService classesService;

    @RequestMapping(value = "/classes", method = POST)
    @ResponseStatus(value = CREATED)
    @ResponseBody
    public Clazz create(@RequestBody Clazz clazz) {
        return classesService.create(clazz);
    }

    @RequestMapping(value = "/classes", method = GET)
    @ResponseStatus(value = CREATED)
    @ResponseBody
    public List<Clazz> readAll() {
        return classesService.readAll();
    }

    @RequestMapping(value = "/classes/{id}", method = GET)
    @ResponseStatus(value = OK)
    @ResponseBody
    public Clazz readById(@PathVariable("id") long id) {
        return classesService.readById(id);
    }
}
