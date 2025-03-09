package com.heroku.java.watchData;

import java.util.List;

public class BreathingData {
    public List<BreathingRateData> getBr() {
        return br;
    }

    public void setBr(List<BreathingRateData> br) {
        this.br = br;
    }

    private List<BreathingRateData> br;

    public static class BreathingRateData {
        private Value value;
        private String dateTime;

        public Value getValue() {
            return value;
        }

        public void setValue(Value value) {
            this.value = value;
        }

        public String getDateTime() {
            return dateTime;
        }

        public void setDateTime(String dateTime) {
            this.dateTime = dateTime;
        }
    }

    public static class Value {
        public double getBreathingRate() {
            return breathingRate;
        }

        public void setBreathingRate(double breathingRate) {
            this.breathingRate = breathingRate;
        }

        private double breathingRate;
    }
}
