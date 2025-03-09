package com.heroku.java.watchData;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
public class HealthAPI {

    @GetMapping("/breathingRate")
    //https://dev.fitbit.com/build/reference/web-api/breathing-rate/get-br-summary-by-date/
    public BreathingData getBreathingData() {
        BreathingData healthData = new BreathingData();
        List<BreathingData.BreathingRateData> brList = new ArrayList<>();

        BreathingData.BreathingRateData data = new BreathingData.BreathingRateData();
        BreathingData.Value value = new BreathingData.Value();
        value.setBreathingRate(17.8);

        data.setValue(value);
        data.setDateTime("2021-10-25");

        brList.add(data);
        healthData.setBr(brList);

        return healthData;
    }
    @GetMapping("/vo2Max")
    //https://dev.fitbit.com/build/reference/web-api/cardio-fitness-score/get-vo2max-summary-by-date/
    public VO2Max getVO2MaxData() {
        VO2Max vo2Max = new VO2Max();
        List<VO2Max.CardioData> dataList = new ArrayList<>();
        VO2Max.CardioData data = new VO2Max.CardioData();
        VO2Max.Value value = new VO2Max.Value();
        value.setVo2Max("46");

        data.setValue(value);
        data.setDateTime("2021-10-25");

        dataList.add(data);
        vo2Max.setCardioScore(dataList);

        return vo2Max;
    }

    @GetMapping("/heartRate")
    //https://dev.fitbit.com/build/reference/web-api/heartrate-timeseries/get-heartrate-timeseries-by-date/
    public HeartRateData getHeartRate() {
        // Hardcoded data based on your JSON
        HeartRateData heartRateData = new HeartRateData();
        heartRateData.setDateTime("2019-05-08");
        heartRateData.setRestingHeartRate(76);
        return heartRateData;
    }

    @GetMapping("/heartRateVariability")
    //https://dev.fitbit.com/build/reference/web-api/heartrate-variability/get-hrv-summary-by-date/
    public HeartRateVariabilityData getHrvData() {
        // Hardcoded data based on your JSON
        HeartRateVariabilityData hrvData = new HeartRateVariabilityData();
        hrvData.setDateTime("2021-10-25");
        hrvData.setDailyRmssd(34.938);
        hrvData.setDeepRmssd(31.567);
        return hrvData;
    }


    @GetMapping("/heartAlert")
    //https://dev.fitbit.com/build/reference/web-api/irregular-rhythm-notifications/get-irn-alerts-list/
    public List<AlertData> getAlerts() {
        List<AlertData> alerts = new ArrayList<>();

        // Creating the first alert
        AlertData alert = new AlertData();
        alert.setAlertTime("2022-09-28T17:12:30.000");
        alert.setDetectedTime("2022-09-28T17:45:00.000");

        List<AlertData.BpmData> bpmList = new ArrayList<>();
        AlertData.BpmData bpm = new AlertData.BpmData();
        bpm.setDataTime("2022-09-28T17:12:30.124");
        bpm.setValue(73);
        bpmList.add(bpm);

        alert.setBpmData(bpmList);
        alerts.add(alert);

        return alerts;
    }

    @GetMapping("/oxygen")
    //https://dev.fitbit.com/build/reference/web-api/spo2/get-spo2-summary-by-date/
    public OxygenData getOxygenData() {
    // Hardcoded data from your JSON
    OxygenData oxygenData = new OxygenData();
    oxygenData.setDateTime("2021-10-04");
    oxygenData.setAvg(97.5);
    oxygenData.setMin(94.0);
    oxygenData.setMax(100.0);
    return oxygenData;
    }
}
