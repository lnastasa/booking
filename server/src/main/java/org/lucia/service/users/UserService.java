package org.lucia.service.users;

import org.lucia.dao.users.UserDao;
import org.lucia.model.users.User;
import org.lucia.service.encryption.EncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private EncryptionService encryptionService;

    public User create(User user) {
        if (user.getType() == null
            || user.getFirstName() == null
            || user.getLastName() == null
            || user.getPasswordHash() == null
            || user.getEmail() == null) {
            throw new IllegalArgumentException("Create user request missing required field : " + user.toString());
        }

        encryptPassword(user);
        User createdUser = userDao.create(user);
        createdUser.removeSensitiveData();
        return createdUser;
    }

    private void encryptPassword(User user) {
        String plainTextPassword = user.getPasswordHash();
        String salt = encryptionService.getSalt();
        String encryptedPassword = encryptionService.encrypt(plainTextPassword, salt);
        user.setPasswordHash(encryptedPassword);
        user.setSalt(salt);
    }
}
