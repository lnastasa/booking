package org.lucia.service.security;

import org.lucia.dao.users.UserDao;
import org.lucia.model.security.AccessRequest;
import org.lucia.model.users.User;
import org.lucia.service.encryption.EncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private EncryptionService encryptionService;

    public User requestAccess(AccessRequest accessRequest) {
        User storedUser = userDao.read(accessRequest.getEmail());
        String salt = storedUser.getSalt();
        String plainTextPassword = accessRequest.getPassword();
        String encryptedPassword = encryptionService.encrypt(plainTextPassword, salt);
        if(encryptedPassword.equals(storedUser.getPasswordHash())) {
            storedUser.removeSensitiveData();
            return storedUser;
        }
        return null;
    }
}
