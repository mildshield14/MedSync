import java.util.Date;

public class Appointment {

    String location;
    int userId;
    int appointmentId;

    Boolean isVirtual;
    String title;
    Date schedule;
    public String getLocation() {
        return location;
    }

    public Boolean getIsVirtual(){
        return isVirtual;
    }

    public Date getSchedule() {
        return schedule;
    }

    public String getTitle() {
        return title;
    }

    public int getAppointmentId() {
        return appointmentId;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setSchedule(Date schedule) {
        this.schedule = schedule;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setVirtual(Boolean virtual) {
        isVirtual = virtual;
    }

    public void setAppointmentId(int appointmentId) {
        this.appointmentId = appointmentId;
    }
}

