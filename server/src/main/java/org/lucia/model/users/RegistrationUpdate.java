package org.lucia.model.users;

public class RegistrationUpdate {

    private int userId;

    private String password;


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "RegistrationUpdate{" +
                "userId=" + userId +
                ", password='" + password + '\'' +
                '}';
    }
}
