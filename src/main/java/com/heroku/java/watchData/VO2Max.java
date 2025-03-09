package com.heroku.java.watchData;

import java.util.List;

public class VO2Max {
    private List<CardioData> cardioScore;

    public List<CardioData> getCardioScore() {
        return cardioScore;
    }

    public void setCardioScore(List<CardioData> cardioScore) {
        this.cardioScore = cardioScore;
    }

    public static class CardioData {
        private String dateTime;
        private Value value;

        public String getDateTime() {
            return dateTime;
        }

        public void setDateTime(String dateTime) {
            this.dateTime = dateTime;
        }

        public Value getValue() {
            return value;
        }

        public void setValue(Value value) {
            this.value = value;
        }
    }

    public static class Value {
        private String vo2Max;

        public String getVo2Max() {
            return vo2Max;
        }

        public void setVo2Max(String vo2Max) {
            this.vo2Max = vo2Max;
        }
    }
}
