package org.lucia.service.users;

import org.lucia.dao.users.UserDao;
import org.lucia.gateway.SmsGateway;
import org.lucia.model.users.RegistrationUpdate;
import org.lucia.model.users.Type;
import org.lucia.model.users.User;
import org.lucia.service.encryption.EncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private SmsGateway smsGateway;

    @Autowired
    private EncryptionService encryptionService;

    public User create(User user) {

        if (user.getPasswordHash() == null && user.getSalt() == null) {
            user.setPasswordHash(encryptionService.getSalt());
            user.setSalt(encryptionService.getSalt());
        }

        if (user.getType() == null
            || user.getFirstName() == null
            || user.getLastName() == null
            || user.getPhoneNumber() == null
            || user.getEmail() == null) {
            throw new IllegalArgumentException("Create user request missing required field : " + user.toString());
        }

        encryptPassword(user);
        User createdUser = userDao.create(user);
        createdUser.removeSensitiveData();

        smsGateway.sendSms(user.getPhoneNumber(), "An account as been created for you in the PMDC system, please go to http://127.0.0.198:3000/register/"+ user.getId() +" to complete registration");

        return createdUser;
    }

    public void completeRegistration(RegistrationUpdate registrationUpdate) {
        User user = userDao.readById(registrationUpdate.getUserId());
        user.setPasswordHash(registrationUpdate.getPassword());
        encryptPassword(user);
        userDao.update(user);
    }

    private void encryptPassword(User user) {
        String plainTextPassword = user.getPasswordHash();
        String salt = encryptionService.getSalt();
        String encryptedPassword = encryptionService.encrypt(plainTextPassword, salt);
        user.setPasswordHash(encryptedPassword);
        user.setSalt(salt);
    }

    public List<User> readByType(Type type) {
        List<User> users = userDao.readByType(type);
        for (User user : users) {
            user.removeSensitiveData();
        }
        return users;
    }

    public User readById(long id) {
        User user = userDao.readById(id);
        user.removeSensitiveData();
        return user;
    }
}
