package org.lucia.api.classes;

import org.lucia.model.classes.Clazz;
import org.lucia.service.classes.ClassesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

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

    @RequestMapping(value = "/classes/{id}", method = PUT)
    @ResponseStatus(value = NO_CONTENT)
    @ResponseBody
    public void addChildren(@PathVariable("id") long classId, @RequestBody List<Long> childIds) {
        classesService.addChildren(classId, childIds);
    }
}
