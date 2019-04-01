package org.lucia.dao.classes;

import org.lucia.model.childs.Child;
import org.lucia.model.classes.Clazz;
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
        clazz.setId(keyHolder.getKey().longValue());
        return clazz;
    }

    public void addChild(long classId, long childId) {
        String sql = String.format("INSERT INTO child_class (class_id, child_id) VALUES (%s,%s);", classId, childId);
        jdbc.execute(sql);
    }

    public List<Clazz> readAll() {
        String sql = String.format("select * from classes");
        return jdbc.query(sql, new BeanPropertyRowMapper<>(Clazz.class));
    }

    public Clazz readById(long id) {
        return jdbc.queryForObject("SELECT * FROM classes WHERE id = ?",
                new Object[]{id},
                new BeanPropertyRowMapper<>(Clazz.class));
    }

    public List<Child> readChildrenIds(long classId) {
        String sql = String.format("select * from childs join child_class on childs.id = child_class.child_id where child_class.class_id = %s", classId);
        return jdbc.query(sql, new BeanPropertyRowMapper<>(Child.class));
    }

    public List<Clazz> readByTeacherId(int teacherId) {
        String sql = String.format("select * from classes where teacher_id = %s", teacherId);
        return jdbc.query(sql, new BeanPropertyRowMapper<>(Clazz.class));
    }

    public List<Child> readUnassignedChildrenById(long id) {
        String sql = String.format("select * from childs where id not in(select child_id from child_class where class_id=%s)", id);
        return jdbc.query(sql, new BeanPropertyRowMapper<>(Child.class));
    }
}
