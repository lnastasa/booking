package org.lucia.service.classes;

import org.lucia.dao.classes.ClassesDao;
import org.lucia.model.childs.Child;
import org.lucia.model.classes.Clazz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassesService {

    @Autowired
    private ClassesDao classesDao;

    public Clazz create(Clazz clazz) {
        clazz = classesDao.create(clazz);
        addChildren(clazz.getId(), clazz.getChildIds());
        return clazz;
    }

    private void addChildren(long classId, List<Long> childIds) {
        for (long childId : childIds) {
            classesDao.addChild(classId, childId);
        }
    }

    public List<Clazz> readAll() {
        return classesDao.readAll();
    }

    public Clazz readById(long id) {
        return classesDao.readById(id);
    }

    public List<Child> readChildrenById(long classId) {
        return classesDao.readChildrenIds(classId);
    }

    public List<Clazz> readByTeacherId(int teacherId) {
        return classesDao.readByTeacherId(teacherId);
    }
}
