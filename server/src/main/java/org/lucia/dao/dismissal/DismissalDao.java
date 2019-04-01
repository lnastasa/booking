package org.lucia.dao.dismissal;

import org.lucia.model.childs.Child;
import org.lucia.model.dismissal.Dismissal;
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
public class DismissalDao {

    @Autowired
    private DataSource dataSource;

    private SimpleJdbcInsert insert;

    private JdbcTemplate jdbc;

    @PostConstruct
    public void configure() {
        insert = new SimpleJdbcInsert(dataSource)
                .withTableName("dismissal")
                .usingGeneratedKeyColumns("id");

        jdbc = new JdbcTemplate(dataSource);
    }

    public Dismissal create(Dismissal dismissal) {
        SqlParameterSource parameters = new BeanPropertySqlParameterSource(dismissal);
        KeyHolder keyHolder = insert.executeAndReturnKeyHolder(parameters);
        dismissal.setId(keyHolder.getKey().longValue());
        return dismissal;
    }

    public List<Dismissal> readByChildId(long id) {
        String sql = String.format("select * from dismissal where child_id = %s", id);
        return jdbc.query(sql, new BeanPropertyRowMapper<>(Dismissal.class));
    }
}
