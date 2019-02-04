package org.lucia.service.classes;

import org.lucia.dao.classes.ClassesDao;
import org.lucia.model.classes.Clazz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassesService {

    @Autowired
    private ClassesDao classesDao;

    public Clazz create(Clazz clazz) {
        return classesDao.create(clazz);
    }

    public void addChildren(long classId, List<Long> childIds) {
        for (long childId : childIds) {
            classesDao.addChild(classId, childId);
        }
    }
}
