package org.lucia.service.dismissal;

import org.lucia.dao.users.UserDao;
import org.lucia.gateway.SmsGateway;
import org.lucia.model.childs.Child;
import org.lucia.model.dismissal.Dismissal;
import org.lucia.model.guardians.Guardian;
import org.lucia.model.users.User;
import org.lucia.service.childs.ChildService;
import org.lucia.service.guardians.GuardiansService;
import org.lucia.service.users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class DismissalService {

    private static final String DISMISSED_TO_PARENT = "Your child %s has been dismissed to their parent by %s";
    private static final String DISMISSED_TO_GUARDIAN = "Your child %s had been dismissed to their guardian %s by %s";

    @Autowired
    private UserService userService;

    @Autowired
    private GuardiansService guardiansService;

    @Autowired
    private ChildService childService;

    @Autowired
    private SmsGateway smsGateway;

    public Dismissal create(Dismissal dismissal) {
        if(dismissal.getTimestamp() == 0) {
            dismissal.setTimestamp(new Date().getTime());
        }

        Child child = childService.readById(dismissal.getChildId());
        User dismissingUser = userService.readById(dismissal.getUserId());
        User parent = userService.readById(child.getParentId());

        Guardian guardian = null;
        if (dismissal.getGuardianId() != 0) {
            guardian = guardiansService.readById(dismissal.getGuardianId());
        }

        String message;
        if(guardian == null) {
            message = String.format(DISMISSED_TO_PARENT, child.getFirstName(), dismissingUser.getName());
        } else {
            message = String.format(DISMISSED_TO_GUARDIAN, child.getFirstName(), guardian.getName(), dismissingUser.getName());
        }

        smsGateway.sendSms(parent.getPhoneNumber(), message);
        return dismissal;
    }
}
