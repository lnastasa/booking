package org.lucia.dao.health;

import org.lucia.model.health.HealthReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class HealthDao {

    @Autowired
    private JdbcTemplate jdbc;

    public HealthReport isHealthy() {
        return (HealthReport) jdbc.queryForObject("SELECT 1 as healthy FROM information_schema.tables LIMIT 1", new BeanPropertyRowMapper(HealthReport.class));
    }
}
