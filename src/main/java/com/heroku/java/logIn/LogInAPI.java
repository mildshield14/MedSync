package com.heroku.java.logIn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class LogInAPI {
    private final LogInRepository authRepository;

    @Autowired
    public LogInAPI(LogInRepository authRepository) {
        this.authRepository = authRepository;
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        authRepository.createTableIfNotExists();
        if(checkAuthentification(username, password)) {
            return ResponseEntity.ok("Login successful");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Login failed: Invalid credentials for user " + username);
        }

    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam String username, @RequestParam String password){
        authRepository.createTableIfNotExists();
        if(authRepository.registerUser(username, password)) {
            return ResponseEntity.ok("Login successful");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Registration failed, please try again");
        }

    }

    @GetMapping("/username")
    public ResponseEntity<LoginResponse> getLoginInfo(@RequestParam Long id) {
        String name = authRepository.getUsernameById(id);
        if(name.equals("User not found")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }else {
            LoginResponse response = new LoginResponse(name);
            return ResponseEntity.ok(response);
        }
    }
    public boolean checkAuthentification(String username, String password){
        authRepository.createTableIfNotExists();
        if(authRepository.isUserValid(username,password)){
            return true;
        }else{
            return false;
        }
    }
    public static class LoginResponse {
        private String name;
        public LoginResponse(String name) {
            this.name = name;
        }
    }
}
