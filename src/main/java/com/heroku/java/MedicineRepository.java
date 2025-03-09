package com.heroku.java;

import com.heroku.java.Medicine;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MedicineRepository {
    private final DataSource dataSource;

    public MedicineRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void createTableIfNotExists() {
        String medicinesSql = "CREATE TABLE IF NOT EXISTS Medicines ("
                + "id SERIAL PRIMARY KEY,"
                + "userId INTEGER NOT NULL,"
                + "name VARCHAR(255) NOT NULL,"
                + "dosage VARCHAR(100),"
                + "schedule TIMESTAMP NOT NULL,"
                + "FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE"
                + ");";


        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(medicinesSql)) {
            statement.executeQuery();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Medicine> getMedicinesByDate(Date date) throws SQLException {
        List<Medicine> medicines = new ArrayList<>();

        String sql = "SELECT * FROM Medicine WHERE DATE(date) = ?";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setDate(1, new java.sql.Date(date.getTime()));
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    Medicine medicine = new Medicine();
                    medicine.setIdMedicine(resultSet.getInt("id"));
                    medicine.setSchedule(resultSet.getDate("schedule"));
                    medicine.setName(resultSet.getString("name"));
                    medicine.setDose(resultSet.getInt("dose"));

                    medicines.add(medicine);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return medicines;
    }
}

