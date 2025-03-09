package com.heroku.java.logIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class LogInRepository {
    private final DataSource dataSource;

    @Autowired
    public LogInRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    public void createTableIfNotExists() {
        String sql = "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,username VARCHAR(255) UNIQUE NOT NULL,"
                + "password VARCHAR(255) NOT NULL, locationName VARCHAR(255));"
                + "INSERT INTO users (username, password) VALUES ('username1', 'password1');"
                + "INSERT INTO users (username, password) VALUES ('username2', 'password2');"
                + "INSERT INTO users (username, password) VALUES ('username3', 'password3');";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
             statement.executeQuery();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    public boolean registerUser(String username, String password) {
        String sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, username);
            statement.setString(2, password);
            statement.executeQuery();
            statement.executeQuery();
            return true; // If any result, user is valid
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    public String getUsernameById(Long id) {
        String sql = "SELECT username FROM users WHERE id = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getString("username");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "User not found";
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

    public String getLocationById(Long id) {
        String sql = "SELECT location FROM users WHERE id = ?";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return rs.getString("location");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "Location not found";
    }

}


