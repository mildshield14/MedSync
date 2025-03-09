package com.heroku.java;

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
public class EventsRepository {


    private final DataSource dataSource;

    @Autowired
    public EventsRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void createTableIfNotExists() {
        String eventsSql = "CREATE TABLE IF NOT EXISTS Events ("
                + "id SERIAL PRIMARY KEY,"
                + "eventsId INTEGER NOT NULL,"
                + "name VARCHAR(255) NOT NULL,"
                + "schedule TIMESTAMP NOT NULL,"
                + "FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE"
                + ");";


        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(eventsSql)) {
            statement.executeQuery();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Events> getEventsByDate(Date date) throws SQLException {
        List<Events> events = new ArrayList<>();

        String sql = "SELECT * FROM Events WHERE DATE(date) = ?";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setDate(1, new java.sql.Date(date.getTime()));
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    Events event = new Medicine();
                    event.setEventId(resultSet.getInt("id"));
                    event.setSchedule(resultSet.getDate("schedule"));
                    event.setName(resultSet.getString("name"));

                    events.add(event);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return events;
    }
}

