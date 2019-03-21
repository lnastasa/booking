package org.lucia.service.childs;

import org.lucia.dao.childs.ChildDao;
import org.lucia.model.childs.Child;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChildService {

    @Autowired
    private ChildDao childDao;

    public Child create(Child child) {
        return childDao.create(child);
    }

    public List<Child> readByParentId(long parentId) {
        if (parentId == 0) {
            return childDao.readAll();
        }
        return childDao.readByParentId(parentId);
    }

    public Child readById(long id) {
        return childDao.readById(id);
    }
}
