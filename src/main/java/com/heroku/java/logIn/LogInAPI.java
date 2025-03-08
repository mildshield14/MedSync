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


    @GetMapping("/login")
    public String showLoginForm() {
        // Return an HTML form or a template name if using Thymeleaf, etc.
        return "<html><body>"
                + "<form method='POST' action='/login'>"
                + "Username: <input type='text' name='username' /><br>"
                + "Password: <input type='password' name='password' /><br>"
                + "<input type='submit' value='Login' />"
                + "</form></body></html>";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(){//@RequestParam String username, @RequestParam String password) {
            return ResponseEntity.ok("Login successful");

    }
}
