package org.lucia.model.attendance;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class AttendanceReport {

    private long id;

    private long classId;

    private long timestamp;

    private List<AttendanceItem> attendance;

    public long getClassId() {
        return classId;
    }

    public void setClassId(long classId) {
        this.classId = classId;
    }

    public List<AttendanceItem> getAttendance() {
        return attendance;
    }

    public void setAttendance(List<AttendanceItem> attendance) {
        this.attendance = attendance;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
