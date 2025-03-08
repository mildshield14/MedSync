import java.util.ArrayList;

public class Profile {
    String username;
    int id;
    String locationName;

    ArrayList<Appointement> appointements;
    ArrayList<Medicine> medicines;
    public String getUsername(){
        return username;
    }

    public int getId() {
        return id;
    }

    public String getLocationName(){
        return locationName;
    }

    public ArrayList<Appointement> getAppointements() {
        return appointements;
    }

    public ArrayList<Medicine> getMedicines() {
        return medicines;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    void setAppointements(ArrayList<Appointement> appointements) {
        this.appointements = appointements;
    }

    void setId(int id) {
        this.id = id;
    }

    void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    void setMedicines(ArrayList<Medicine> medicines) {
        this.medicines = medicines;
    }
}
