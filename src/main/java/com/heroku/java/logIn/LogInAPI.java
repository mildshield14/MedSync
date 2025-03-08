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

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        if(checkAuthentification(username, password)) {
            return ResponseEntity.ok("Login successful");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Login failed: Invalid credentials");
        }

    }
    @GetMapping("/username")
    public ResponseEntity<LoginResponse> getLoginInfo() {
        // Simuler un nom d'utilisateur (normalement récupéré depuis la base de données ou un token)
        String name = "John Doe";

        // Créer la réponse
        LoginResponse response = new LoginResponse(name);

        // Retourner la réponse avec un code 200
        return ResponseEntity.ok(response);
    }

    // Classe interne représentant la réponse JSON
    public static class LoginResponse {
        private String name;
        public LoginResponse(String name) {
            this.name = name;
        }
    }

    public boolean checkAuthentification(String username, String password){
        String usernameCheck = "username1";
        String passwordCheck = "password123";
        if(username.equalsIgnoreCase(usernameCheck) && password.equalsIgnoreCase(passwordCheck)){
            return true;
        }else{
            return false;
        }
    }
}
