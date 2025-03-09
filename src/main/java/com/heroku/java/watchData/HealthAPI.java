package com.heroku.java.watchData;

import jakarta.websocket.server.PathParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.time.LocalDate.now;

@RestController
public class HealthAPI {

    @GetMapping("/breathingRate")
    //https://dev.fitbit.com/build/reference/web-api/breathing-rate/get-br-summary-by-date/
    public ResponseEntity<BreathingData> getBreathingData() {
        BreathingData healthData = new BreathingData();
        List<BreathingData.BreathingRateData> brList = new ArrayList<>();

        BreathingData.BreathingRateData data = new BreathingData.BreathingRateData();
        BreathingData.Value value = new BreathingData.Value();
        value.setBreathingRate(17.8);

        data.setValue(value);
        data.setDateTime("2021-10-25");

        brList.add(data);
        healthData.setBr(brList);

        return ResponseEntity.ok(healthData);
    }
    @GetMapping("/vo2Max")
    //https://dev.fitbit.com/build/reference/web-api/cardio-fitness-score/get-vo2max-summary-by-date/
    public ResponseEntity<VO2Max> getVO2MaxData() {
        VO2Max vo2Max = new VO2Max();
        List<VO2Max.CardioData> dataList = new ArrayList<>();
        VO2Max.CardioData data = new VO2Max.CardioData();
        VO2Max.Value value = new VO2Max.Value();
        value.setVo2Max("46");

        data.setValue(value);
        data.setDateTime("2021-10-25");

        dataList.add(data);
        vo2Max.setCardioScore(dataList);

        return ResponseEntity.ok(vo2Max);

    }

    @GetMapping("/heartRate/{numbers}")
    //https://dev.fitbit.com/build/reference/web-api/heartrate-timeseries/get-heartrate-timeseries-by-date/
    public ResponseEntity<HeartRateData[]> getHeartRate(@PathVariable() Optional<Integer> numbers) {
        // Hardcoded data based on your JSON
        int finalNumber = numbers.orElse(1);
        HeartRateData[] heartRateData = new HeartRateData[finalNumber];

        for (int i = 0; i < finalNumber; i++) {
            heartRateData[i] = new HeartRateData();
            heartRateData[i].setDateTime(String.valueOf(now().minusDays(i)));
            heartRateData[i].setRestingHeartRate(76%50 +70);
        }
;
        return ResponseEntity.ok(heartRateData);
    }

    @GetMapping("/heartRateVariability")
    //https://dev.fitbit.com/build/reference/web-api/heartrate-variability/get-hrv-summary-by-date/
    public ResponseEntity<HeartRateVariabilityData> getHrvData() {
        // Hardcoded data based on your JSON
        HeartRateVariabilityData hrvData = new HeartRateVariabilityData();
        hrvData.setDateTime("2021-10-25");
        hrvData.setDailyRmssd(34.938);
        hrvData.setDeepRmssd(31.567);
        return ResponseEntity.ok(hrvData);
    }


    @GetMapping("/heartAlert")
    //https://dev.fitbit.com/build/reference/web-api/irregular-rhythm-notifications/get-irn-alerts-list/
    public ResponseEntity<List<AlertData>> getAlerts() {
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

        return ResponseEntity.ok(alerts);
    }

    @GetMapping("/oxygen")
    //https://dev.fitbit.com/build/reference/web-api/spo2/get-spo2-summary-by-date/
    public ResponseEntity<OxygenData> getOxygenData() {
    // Hardcoded data from your JSON
    OxygenData oxygenData = new OxygenData();
    oxygenData.setDateTime("2021-10-04");
    oxygenData.setAvg(97.5);
    oxygenData.setMin(94.0);
    oxygenData.setMax(100.0);
    return ResponseEntity.ok(oxygenData);
    }
}
