import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;

@Repository
public class AppointementsRepository {
    private final DataSource dataSource;

    public AppointementsRepository(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void createTableIfNotExists() {
        String createAppointmentsSql = "CREATE TABLE IF NOT EXISTS Appointments ("
                + "id SERIAL PRIMARY KEY,"
                + "userId INTEGER NOT NULL,"
                + "title VARCHAR(255) NOT NULL,"
                + "schedule TIMESTAMP NOT NULL,"
                + "location VARCHAR(255),"
                + "isVirtual BOOLEAN DEFAULT FALSE,"
                + "FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE"
                + ");";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(createAppointmentsSql)) {
            statement.executeQuery();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public ArrayList<Appointment> getAppointmentsByDate(Date date) throws SQLException {
        ArrayList<Appointment> appointments = new ArrayList<>();

        String sql = "SELECT * FROM Appointements WHERE DATE(date) = ?";

        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setDate(1, new java.sql.Date(date.getTime()));
            try (ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    Appointment appointment = new Appointment();
                    appointment.setAppointmentId(resultSet.getInt("id"));
                    appointment.setSchedule(resultSet.getDate("schedule"));
                    appointment.setTitle(resultSet.getString("title"));
                    //appointment.setDate(resultSet.getTimestamp("schedule"));
                    appointment.setLocation(resultSet.getString("location"));
                    appointment.setVirtual(resultSet.getBoolean("isVirtual"));

                    appointments.add(appointment);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return appointments;
    }


}


