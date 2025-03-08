package com.heroku.java.logIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class LogInRepository {
    private final DataSource dataSource;

    @Autowired
    public LogInRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public boolean isUserValid(String username, String password) {
        String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, username);
            statement.setString(2, password);

            ResultSet resultSet = statement.executeQuery();
            return resultSet.next(); // If any result, user is valid

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}


