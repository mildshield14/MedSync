package com.heroku.java;


import com.heroku.java.logIn.LogInRepository;
import com.heroku.java.MedicineRepository;
import com.heroku.java.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.*;

import static java.time.LocalDate.now;

@RestController
@RequestMapping("/dashboard")
public class DashboardAPI {

    @Autowired
    private LogInRepository logInRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private MedicineRepository medicineRepository;

    public UsersProfiles usersProfiles;
    @GetMapping("/events/{userId}")
    public ResponseEntity<?> getEvents(@PathVariable Long userId) throws SQLException {

        UserProfile user = usersProfiles.UserProfileFromId(userId);

        if (user == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user found.");
        }
        List<Events> events = user.eventsRepository.getEventsByDate(new Date());

        return ResponseEntity.ok(events);
    }

    @GetMapping("/events/appointment/{userId}")
    public ResponseEntity<?> getAppointments(@PathVariable Long userId) throws SQLException {
        UserProfile user = usersProfiles.UserProfileFromId(userId);

        if (user == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user found.");
        }
        List<Events> events = user.eventsRepository.getEventsByDate(new Date());

        return ResponseEntity.ok(events);
    }

    @GetMapping("/events/medicine/{userId}")
    public ResponseEntity<?> getMedicines(@PathVariable Long userId) throws SQLException {
        UserProfile user = usersProfiles.UserProfileFromId(userId);

        if (user == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user found.");
        }
        List<Medicine> events = user.getMedicines();

        return ResponseEntity.ok(events);
    }


    @GetMapping("/events/medicine/byDate/{userId}")
    public ResponseEntity<?> getMedicinesByDate(@PathVariable Long userId, Date schedule) throws SQLException {
        UserProfile user = usersProfiles.UserProfileFromId(userId);

        if (user == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user found.");
        }
        List<Medicine> medicines = user.medicineRepository.getMedicinesByDate(schedule);

        return ResponseEntity.ok(medicines);
    }


    @GetMapping("/events/appointments/byDate/{userId}")
    public ResponseEntity<?> getAppointmentsByDate(@PathVariable Long userId, Date schedule) throws SQLException {
        UserProfile user = usersProfiles.UserProfileFromId(userId);

        if (user == null) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user found.");
        }
        List<Appointment> appointments = user.appointmentRepository.getAppointmentsByDate(schedule);

        return ResponseEntity.ok(appointments);
    }

}
