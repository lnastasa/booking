package org.lucia.api.attendance;

import org.lucia.model.attendance.AttendanceReport;
import org.lucia.model.childs.Child;
import org.lucia.model.classes.Clazz;
import org.lucia.service.attendance.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class AttendanceResource {

    @Autowired
    private AttendanceService attendanceService;

    @RequestMapping(value = "/attendance", method = POST)
    @ResponseStatus(value = CREATED)
    @ResponseBody
    public AttendanceReport createReport(@RequestBody AttendanceReport attendanceReport) {
        return attendanceService.create(attendanceReport);
    }

    @RequestMapping(value = "/attendance/class/{id}", method = GET)
    @ResponseStatus(value = OK)
    @ResponseBody
    public List<AttendanceReport> readById(@PathVariable("id") long classId) {
        return attendanceService.readByClassId(classId);
    }

    @RequestMapping(value = "/attendance/report/{id}", method = GET)
    @ResponseStatus(value = OK)
    @ResponseBody
    public AttendanceReport readByReportId(@PathVariable("id") long reportId) {
        return attendanceService.readByReportId(reportId);
    }
}
