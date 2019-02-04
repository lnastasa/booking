package org.lucia.dao.classes;

import org.lucia.model.classes.Clazz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

@Repository
public class ClassesDao {

    @Autowired
    private DataSource dataSource;

    private SimpleJdbcInsert insert;

    private JdbcTemplate jdbc;

    @PostConstruct
    public void configure() {
        insert = new SimpleJdbcInsert(dataSource)
                .withTableName("classes")
                .usingGeneratedKeyColumns("id");

        jdbc = new JdbcTemplate(dataSource);
    }

    public Clazz create(Clazz clazz) {
        SqlParameterSource parameters = new BeanPropertySqlParameterSource(clazz);
        KeyHolder keyHolder = insert.executeAndReturnKeyHolder(parameters);
        clazz.setId((Long) keyHolder.getKey());
        return clazz;
    }

    public void addChild(long classId, long childId) {
        String sql = String.format("INSERT INTO child_class (class_id, child_id) VALUES (%s,%s);", classId, childId);
        jdbc.execute(sql);
    }
}
