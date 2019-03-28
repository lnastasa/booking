package org.lucia.model.dismissal;

public class Dismissal {

    private long id;

    private long childId;

    private long timestamp;

    private long userId;

    private long guardianId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getChildId() {
        return childId;
    }

    public void setChildId(long childId) {
        this.childId = childId;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getGuardianId() {
        return guardianId;
    }

    public void setGuardianId(long guardianId) {
        this.guardianId = guardianId;
    }

    @Override
    public String toString() {
        return "Dismissal{" +
                "id=" + id +
                ", childId=" + childId +
                ", timestamp=" + timestamp +
                ", userId=" + userId +
                ", guardianId=" + guardianId +
                '}';
    }
}
