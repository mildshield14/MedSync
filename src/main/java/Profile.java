import com.heroku.java.logIn.LogInRepository;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Profile {
    AppointementsRepository appointementsRepository;
    MedicineRepository medicineRepository;
    LogInRepository logInRepository;

    Long userId ; ///////////////
    String username =
            logInRepository.getUsernameById(userId);

    String locationName =
            logInRepository.getLocationById(userId);

    List<Appointment> appointments =
            appointementsRepository.getAppointmentsByDate(new Date());
    List<Medicine> medicines =
            medicineRepository.getMedicinesByDate(new Date());

    public Profile() throws SQLException {
    }

    public String getUsername(){
        return username;
    }

    public Long getUserId() {
        return userId;
    }

    public String getLocationName(){
        return locationName;
    }

    public List<Appointment> getAppointements() {
        return appointments;
    }

    public List<Medicine> getMedicines() {
        return medicines;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    void setAppointements(ArrayList<Appointment> appointments) {
        this.appointments = appointments;
    }

    void setUserId(Long userId) {
        this.userId = userId;
    }

    void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    void setMedicines(ArrayList<Medicine> medicines) {
        this.medicines = medicines;
    }
}
