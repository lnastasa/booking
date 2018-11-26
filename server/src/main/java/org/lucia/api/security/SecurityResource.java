package org.lucia.api.security;

import org.lucia.model.security.AccessRequest;
import org.lucia.model.users.User;
import org.lucia.service.security.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class SecurityResource {

    @Autowired
    private SecurityService securityService;

    @RequestMapping(value = "/security", method = POST)
    @ResponseBody
    public ResponseEntity<User> requestAccess(@RequestBody AccessRequest accessRequest) {
        User user = securityService.requestAccess(accessRequest);
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
