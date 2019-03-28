package org.lucia.dao.guardians;

import org.lucia.model.childs.Child;
import org.lucia.model.guardians.Guardian;
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
public class GuardiansDao {

    @Autowired
    private DataSource dataSource;

    private SimpleJdbcInsert insert;

    private JdbcTemplate jdbc;

    @PostConstruct
    public void configure() {
        insert = new SimpleJdbcInsert(dataSource)
                .withTableName("guardians")
                .usingGeneratedKeyColumns("id");

        jdbc = new JdbcTemplate(dataSource);
    }

    public Guardian create(Guardian guardian) {
        SqlParameterSource parameters = new BeanPropertySqlParameterSource(guardian);
        KeyHolder keyHolder = insert.executeAndReturnKeyHolder(parameters);
        guardian.setId(keyHolder.getKey().longValue());
        return guardian;
    }

    public List<Guardian> readByChildId(long childId) {
        String sql = String.format("select * from guardians where child_id = %s;", childId);
        return jdbc.query(sql, new BeanPropertyRowMapper<>(Guardian.class));
    }

    public Guardian readById(long id) {
        return jdbc.queryForObject("select * from guardians where id = ?",
                new Object[]{id},
                new BeanPropertyRowMapper<>(Guardian.class));
    }
}
