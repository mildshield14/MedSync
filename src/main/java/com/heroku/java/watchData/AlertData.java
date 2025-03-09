package com.heroku.java.watchData;

import java.util.List;

public class AlertData {
    private String alertTime;
    private String detectedTime;
    private List<BpmData> bpmData;

    public String getAlertTime() {
        return alertTime;
    }

    public void setAlertTime(String alertTime) {
        this.alertTime = alertTime;
    }

    public String getDetectedTime() {
        return detectedTime;
    }

    public void setDetectedTime(String detectedTime) {
        this.detectedTime = detectedTime;
    }

    public List<BpmData> getBpmData() {
        return bpmData;
    }

    public void setBpmData(List<BpmData> bpmData) {
        this.bpmData = bpmData;
    }

    public static class BpmData {
        private String dataTime;
        private int value;

        public String getDataTime() {
            return dataTime;
        }

        public void setDataTime(String dataTime) {
            this.dataTime = dataTime;
        }

        public int getValue() {
            return value;
        }

        public void setValue(int value) {
            this.value = value;
        }
    }
}
