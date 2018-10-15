package org.lucia.service.users;

import org.lucia.dao.users.SuperUserDao;
import org.lucia.model.users.SuperUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SuperUserService {

    @Autowired
    private SuperUserDao superUserDao;

    public SuperUser create(SuperUser superUser) {
        return superUserDao.create(superUser);
    }
}
