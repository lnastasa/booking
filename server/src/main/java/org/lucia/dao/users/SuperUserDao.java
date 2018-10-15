package org.lucia.dao.users;

import org.lucia.model.users.SuperUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

@Repository
public class SuperUserDao {

    @Autowired
    private SimpleJdbcInsert insert;

    public SuperUser create(SuperUser superUser) {
        SqlParameterSource parameters = new BeanPropertySqlParameterSource(superUser);
        int id = insert.execute(parameters);
        superUser.setId(id);
        return superUser;
    }
}
