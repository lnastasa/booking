package org.lucia.dao.users;

import org.lucia.model.users.User;
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
import java.sql.Types;

@Repository
public class UserDao {

    @Autowired
    private DataSource dataSource;

    private SimpleJdbcInsert insert;

    private JdbcTemplate jdbc;

    @PostConstruct
    public void configure() {
        insert = new SimpleJdbcInsert(dataSource)
                .withTableName("users")
                .usingGeneratedKeyColumns("id");

        jdbc = new JdbcTemplate(dataSource);
    }

    public User create(User user) {
        SqlParameterSource parameters = new BeanPropertySqlParameterSource(user);
        KeyHolder keyHolder = insert.executeAndReturnKeyHolder(parameters);
        user.setId((Long) keyHolder.getKey());
        return user;
    }

    public void update(User user) {
        String sql = "UPDATE users SET password_hash = ?, salt = ? WHERE id = ?";

        Object[] params = {
                user.getPasswordHash(),
                user.getSalt(),
                user.getId()
        };

        int[] types = {
                Types.VARCHAR,
                Types.VARCHAR,
                Types.BIGINT
        };

        jdbc.update(sql, params, types);
    }

    public User read(String email) {
        return jdbc.queryForObject("SELECT * FROM users WHERE email = ?",
                new Object[]{email},
                new BeanPropertyRowMapper<>(User.class));
    }

    public User readByPhoneNumber(String phoneNumber) {
        return jdbc.queryForObject("SELECT * FROM users WHERE phoneNumber = ?",
                new Object[]{phoneNumber},
                new BeanPropertyRowMapper<>(User.class));
    }
}