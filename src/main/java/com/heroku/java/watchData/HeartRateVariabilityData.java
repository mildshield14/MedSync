package com.heroku.java.watchData;

public class HeartRateVariabilityData {
    private String dateTime;
    private double dailyRmssd;
    private double deepRmssd;

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public double getDailyRmssd() {
        return dailyRmssd;
    }

    public void setDailyRmssd(double dailyRmssd) {
        this.dailyRmssd = dailyRmssd;
    }

    public double getDeepRmssd() {
        return deepRmssd;
    }

    public void setDeepRmssd(double deepRmssd) {
        this.deepRmssd = deepRmssd;
    }

}
