package org.lucia.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class HealthDao {

    @Autowired
    private JdbcTemplate jdbc;

    public boolean isHealthy() {
        return (Boolean) jdbc.queryForObject("SELECT 1 FROM information_schema.tables LIMIT 1", new BeanPropertyRowMapper(Boolean.class));
    }
}
