package org.lucia.dao.attendance;

import org.lucia.model.attendance.AttendanceItem;
import org.lucia.model.attendance.AttendanceReport;
import org.lucia.model.childs.Child;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.lang.String.*;

@Repository
public class AttendanceDao {

    @Autowired
    private DataSource dataSource;

    private SimpleJdbcInsert insert;

    private JdbcTemplate jdbc;

    @PostConstruct
    public void configure() {
        insert = new SimpleJdbcInsert(dataSource)
                .withTableName("attendance_report")
                .usingGeneratedKeyColumns("id");

        jdbc = new JdbcTemplate(dataSource);
    }

    public AttendanceReport create(AttendanceReport attendanceReport) {
        attendanceReport.setTimestamp(new Date().getTime() / 1000);
        attendanceReport = saveReport(attendanceReport);
        saveAttendance(attendanceReport);
        return attendanceReport;
    }

    private void saveAttendance(AttendanceReport attendanceReport) {
        for (AttendanceItem attendanceItem : attendanceReport.getAttendance()) {
            jdbc.execute(format("INSERT INTO attendance_report_child (attendance_report_id, child_id, present) VALUES(%s, %s, %s);", attendanceReport.getId(), attendanceItem.getChildId(), attendanceItem.isPresent()));
        }
    }

    private AttendanceReport saveReport(AttendanceReport attendanceReport) {
        SqlParameterSource parameters = new BeanPropertySqlParameterSource(attendanceReport);
        KeyHolder keyHolder = insert.executeAndReturnKeyHolder(parameters);
        attendanceReport.setId(keyHolder.getKey().longValue());
        return attendanceReport;
    }

    public List<AttendanceReport> readByClassId(long classId) {
        String sql = String.format("select * from attendance_report where class_id = %s", classId);
        return jdbc.query(sql, new BeanPropertyRowMapper<>(AttendanceReport.class));
    }

    public AttendanceReport readByReportId(long reportId) {
        AttendanceReport attendanceReport = jdbc.queryForObject("SELECT * FROM attendance_report WHERE id = ?",
                new Object[]{reportId},
                new BeanPropertyRowMapper<>(AttendanceReport.class));

        String sql = String.format("select * from attendance_report_child where attendance_report_id = %s", reportId);
        List<AttendanceItem> attendanceItems =  jdbc.query(sql, new BeanPropertyRowMapper<>(AttendanceItem.class));

        attendanceReport.setAttendance(attendanceItems);
        return attendanceReport;
    }
}
