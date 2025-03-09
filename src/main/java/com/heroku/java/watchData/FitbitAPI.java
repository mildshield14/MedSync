package com.heroku.java.watchData;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.SecureRandom;
import java.util.Base64;

@RestController
@RequestMapping("/api/fitbit")
public class FitbitAPI {

    private String clientId = "23Q4VM";
    private String redirectUri = "http://localhost:5173/profile/";
    private String fitbitTokenUrl = "https://api.fitbit.com/oauth2/token";
    //private String code = "fd6ea0467590d1f0e6b7790fcf486f8a";
    private String codeVerifier;

    @GetMapping("/login")
    public ResponseEntity<String> login() {
        codeVerifier = generateCodeVerifier();
        String codeChallenge = generateCodeChallenge(codeVerifier);

        String authorizationUrl = "https://www.fitbit.com/oauth2/authorize?"
                + "client_id=" + clientId
                + "&response_type=code"
                + "&code_challenge=" + codeChallenge
                + "&code_challenge_method=S256"
                + "&scope=respiratory_rate%20heartrate%20oxygen_saturation%20respiratory_rate%20activity"
                + "&redirect_uri=" + redirectUri;

        return ResponseEntity.status(HttpStatus.FOUND)
                .header(HttpHeaders.LOCATION, authorizationUrl)
                .build();
    }


    public OxygenData getSpo2Data(String accessToken) throws Exception {
        String urlString = "https://api.fitbit.com/1/user/-/spo2/date/2021-10-04.json";
        URL url = new URL(urlString);

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Authorization", "Bearer " + accessToken);
        connection.setRequestProperty("Accept", "application/json");

        int responseCode = connection.getResponseCode();
        if (responseCode != 200) {
            throw new RuntimeException("Failed : HTTP Error code : " + responseCode);
        }

        BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder response = new StringBuilder();
        String output;
        while ((output = br.readLine()) != null) {
            response.append(output);
        }
        connection.disconnect();

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(response.toString(), OxygenData.class);
    }


    @GetMapping("/callback")
    public ResponseEntity<String> callback(@RequestPart String code) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String body = "client_id=" + clientId
                + "&code=" + code
                + "&code_verifier=" + codeVerifier
                + "&grant_type=authorization_code";

        HttpEntity<String> request = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(fitbitTokenUrl, request, String.class);

        return ResponseEntity.ok(response.getBody());
    }

    private static String generateCodeVerifier() {
        byte[] bytes = new byte[64];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private String generateCodeChallenge(String codeVerifier) {
        return Base64.getUrlEncoder().withoutPadding()
                .encodeToString(codeVerifier.getBytes());
    }
}
