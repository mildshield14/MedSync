package com.heroku.java;

import java.util.Date;

public class Medicine {
    int dose;
    String name;
    int idMedicine;
    Date schedule;

    public String getName() {
        return name;
    }

    public int getIdMedicine(){
        return idMedicine;
    }

    public Date getSchedule(){
        return schedule;
    }

    public int getDose() {
        return dose;
    }

    public void setSchedule(Date schedule) {
        this.schedule = schedule;
    }

    public void setIdMedicine(int idMedicine) {
        this.idMedicine = idMedicine;
    }

    public void setDose(int dose) {
        this.dose = dose;
    }

    public void setName(String name) {
        this.name = name;
    }
}

