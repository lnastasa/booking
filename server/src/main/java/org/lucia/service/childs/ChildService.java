package org.lucia.service.childs;

import org.lucia.dao.childs.ChildDao;
import org.lucia.model.childs.Child;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChildService {

    @Autowired
    private ChildDao childDao;

    public Child create(Child child) {
        return childDao.create(child);
    }
}
