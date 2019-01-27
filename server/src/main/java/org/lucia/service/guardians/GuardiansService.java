package org.lucia.service.guardians;

import org.lucia.dao.guardians.GuardiansDao;
import org.lucia.model.guardians.Guardian;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GuardiansService {

    @Autowired
    private GuardiansDao guardiansDao;

    public Guardian create(Guardian guardian) {
        return guardiansDao.create(guardian);
    }
}
