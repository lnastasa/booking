package org.lucia.service.users;

import org.lucia.dao.users.AdministratorDao;
import org.lucia.model.users.Administrator;
import org.lucia.model.users.Type;
import org.lucia.service.encryption.EncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministratorService {

    @Autowired
    private AdministratorDao administratorDao;

    @Autowired
    private EncryptionService encryptionService;

    public Administrator create(Administrator administrator) {
        encryptPassword(administrator);
        administrator.setType(Type.ADMINISTRATOR);
        Administrator createdAdministrator = administratorDao.create(administrator);
        removeSensitiveData(createdAdministrator);
        return createdAdministrator;
    }

    private void removeSensitiveData(Administrator administrator) {
        administrator.setPasswordHash(null);
        administrator.setSalt(null);
    }

    private void encryptPassword(Administrator administrator) {
        String plainTextPassword = administrator.getPasswordHash();
        String salt = encryptionService.getSalt();
        String encryptedPassword = encryptionService.encrypt(plainTextPassword, salt);
        administrator.setPasswordHash(encryptedPassword);
        administrator.setSalt(salt);
    }
}
