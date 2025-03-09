package com.heroku.java;

import java.util.Date;

public abstract class Events {
    Date schedule;
    String name;
    int eventId;


    public Date getSchedule() {
        return schedule;
    }

    public String getName() {
        return name;
    }

    public int getEventId() {
        return eventId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSchedule(Date schedule) {
        this.schedule = schedule;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

}
