import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Dashboard {
    Profile user;
    void sendEvents(Profile user) {
        ObjectMapper Events = new ObjectMapper();

        try {
            Map<String, Object> jsonData = new HashMap<>();

            ArrayList<Appointement> userAppointements = user.getAppointements();
            ArrayList<Medicine> userMedicines = user.getMedicines();

            for (int a = 0; a < user.getAppointements().size(); a++) {
                jsonData.put("title", userAppointements.get(a).getTitle());
                jsonData.put("date", userAppointements.get(a).getSchedule());
                jsonData.put("location", userAppointements.get(a).getLocation());
                jsonData.put("isVirtual", userAppointements.get(a).getIsVirtual());
            }

            for (int m = 0; m < user.getMedicines().size(); m++) {
                jsonData.put("id", userMedicines.get(m).getIdMedicine());
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

    void sendEventsBy(Profile user, String filter) {
        ObjectMapper filteredEvents = new ObjectMapper();

        try {
            Map<String, Object> jsonData = new HashMap<>();

            switch (filter) {

                case "Appointements":
                    ArrayList<Appointement> userAppointements = user.getAppointements();

                    for (int a = 0; a < user.getAppointements().size(); a++) {
                        jsonData.put("title", userAppointements.get(a).getTitle());
                        jsonData.put("date", userAppointements.get(a).getSchedule());
                        jsonData.put("location", userAppointements.get(a).getLocation());
                        jsonData.put("isVirtual", userAppointements.get(a).getIsVirtual());
                    }
                    break;

                case "Medications":
                    ArrayList<Medicine> userMedicines = user.getMedicines();
                    for (int m = 0; m < user.getMedicines().size(); m++) {
                        jsonData.put("id", userMedicines.get(m).getIdMedicine());
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
