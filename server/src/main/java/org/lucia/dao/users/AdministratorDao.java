package org.lucia.dao.users;

import org.lucia.model.users.Administrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

@Repository
public class AdministratorDao {

    @Autowired
    private DataSource dataSource;

    private SimpleJdbcInsert insert;

    @PostConstruct
    public void configure() {
        insert = new SimpleJdbcInsert(dataSource)
                .withTableName("users")
                .usingGeneratedKeyColumns("id");
    }

    public Administrator create(Administrator administrator) {
        SqlParameterSource parameters = new BeanPropertySqlParameterSource(administrator);
        KeyHolder keyHolder = insert.executeAndReturnKeyHolder(parameters);
        administrator.setId((Long) keyHolder.getKey());
        return administrator;
    }
}
