package org.lucia.service.guardians;

import org.lucia.dao.guardians.GuardiansDao;
import org.lucia.model.guardians.Guardian;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuardiansService {

    @Autowired
    private GuardiansDao guardiansDao;

    public Guardian create(Guardian guardian) {
        return guardiansDao.create(guardian);
    }

    public List<Guardian> readByChildId(int childId) {
        return guardiansDao.readByChildId(childId);
    }
}
