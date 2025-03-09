package com.heroku.java;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.heroku.java.Appointment;
import com.heroku.java.Medicine;
import com.heroku.java.UserProfile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Dashboard {
    UserProfile user;
    void sendEvents(UserProfile user) {
        ObjectMapper Events = new ObjectMapper();

        try {
            Map<String, Object> jsonData = new HashMap<>();

            List<Appointment> userAppointments = user.getAppointements();
            List<Medicine> userMedicines = user.getMedicines();

            for (int a = 0; a < user.getAppointements().size(); a++) {
                jsonData.put("title", userAppointments.get(a).getName());
                jsonData.put("date", userAppointments.get(a).getSchedule());
                jsonData.put("location", userAppointments.get(a).getLocation());
                jsonData.put("isVirtual", userAppointments.get(a).getIsVirtual());
            }

            for (int m = 0; m < user.getMedicines().size(); m++) {
                jsonData.put("id", userMedicines.get(m).getEventId());
                jsonData.put("title", userMedicines.get(m).getName());
                jsonData.put("dose", userMedicines.get(m).getDose());
                jsonData.put("date", userMedicines.get(m).getSchedule());
            }

            Events.writerWithDefaultPrettyPrinter()
                    .writeValue(new File("Events.json"), jsonData);

            System.out.println("JSON file generated.");
        } catch (IOException e) {

        }
    }

    void sendEventsBy(UserProfile user, String filter) {
        ObjectMapper filteredEvents = new ObjectMapper();

        try {
            Map<String, Object> jsonData = new HashMap<>();

            switch (filter) {

                case "Appointements":
                    List<Appointment> userAppointments = user.getAppointements();

                    for (int a = 0; a < user.getAppointements().size(); a++) {
                        jsonData.put("title", userAppointments.get(a).getName());
                        jsonData.put("date", userAppointments.get(a).getSchedule());
                        jsonData.put("location", userAppointments.get(a).getLocation());
                        jsonData.put("isVirtual", userAppointments.get(a).getIsVirtual());
                    }
                    break;

                case "Medications":
                    List<Medicine> userMedicines = user.getMedicines();
                    for (int m = 0; m < user.getMedicines().size(); m++) {
                        jsonData.put("id", userMedicines.get(m).getEventId());
                        jsonData.put("title", userMedicines.get(m).getName());
                        jsonData.put("dose", userMedicines.get(m).getDose());
                        jsonData.put("date", userMedicines.get(m).getSchedule());
                    }
                    break;

                default:
                    break;
            }

            filteredEvents.writerWithDefaultPrettyPrinter()
                    .writeValue(new File("filteredEventsby" + filter + ".json"), jsonData);

            System.out.println("JSON file generated.");
        } catch (IOException e) {

        }
    }

}
