package com.heroku.java;

import java.util.Date;

public class Appointment extends Events {

    String location;
    int userId;
    Boolean isVirtual;

    public String getLocation() {
        return location;
    }

    public Boolean getIsVirtual() {
        return isVirtual;
    }

    public Date getSchedule() {
        return schedule;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setSchedule(Date schedule) {
        this.schedule = schedule;
    }


    public void setVirtual(Boolean virtual) {
        isVirtual = virtual;
    }
}


