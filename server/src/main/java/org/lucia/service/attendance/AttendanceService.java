package org.lucia.service.attendance;

import org.lucia.dao.attendance.AttendanceDao;
import org.lucia.model.attendance.AttendanceReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceDao attendanceDao;

    public AttendanceReport create(AttendanceReport attendanceReport) {
        return attendanceDao.create(attendanceReport);
    }

    public List<AttendanceReport> readByClassId(long classId) {
        return attendanceDao.readByClassId(classId);
    }

    public AttendanceReport readByReportId(long reportId) {
        return attendanceDao.readByReportId(reportId);
    }
}
