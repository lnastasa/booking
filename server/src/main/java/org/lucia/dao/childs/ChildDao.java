package org.lucia.dao.childs;

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
import java.util.List;

@Repository
public class ChildDao {

    @Autowired
    private DataSource dataSource;

    private SimpleJdbcInsert insert;

    private JdbcTemplate jdbc;

    @PostConstruct
    public void configure() {
        insert = new SimpleJdbcInsert(dataSource)
                .withTableName("childs")
                .usingGeneratedKeyColumns("id");

        jdbc = new JdbcTemplate(dataSource);
    }

    public Child create(Child child) {
        SqlParameterSource parameters = new BeanPropertySqlParameterSource(child);
        KeyHolder keyHolder = insert.executeAndReturnKeyHolder(parameters);
        child.setId((Long) keyHolder.getKey());
        return child;
    }

    public List<Child> readByParentId(int parentId) {
        String sql = String.format("select * from childs where parent_id = %s;", parentId);
        return jdbc.query(sql, new BeanPropertyRowMapper<>(Child.class));
    }

    public Child readById(long id) {
        return jdbc.queryForObject("SELECT * FROM childs WHERE id = ?",
                new Object[]{id},
                new BeanPropertyRowMapper<>(Child.class));
    }

    public List<Child> readAll() {
        String sql = String.format("select * from childs");
        return jdbc.query(sql, new BeanPropertyRowMapper<>(Child.class));
    }
}
