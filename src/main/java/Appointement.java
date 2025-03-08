import java.util.Date;

public class Appointement {
    String location;
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
}
