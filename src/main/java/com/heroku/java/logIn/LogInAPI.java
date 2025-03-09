package com.heroku.java.logIn;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true")
public class LogInAPI {
    private final LogInRepository authRepository;

    @Autowired
    public LogInAPI(LogInRepository authRepository) {
        this.authRepository = authRepository;
    }
    @PostMapping("/login")
    public ResponseEntity<String>  login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        authRepository.createTableIfNotExists();
        if(checkAuthentification(loginRequest.username, loginRequest.password)) {
            Cookie cookie = new Cookie("SESSIONID", generateSessionId());
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(30 * 60 *60); // 30 hours expiration

            response.addCookie(cookie);
            return ResponseEntity.ok("Login successful");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Login failed: Invalid credentials for user ");
        }

    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody LoginRequest loginRequest, HttpServletResponse response){
        authRepository.createTableIfNotExists();
        if(authRepository.registerUser(loginRequest.username, loginRequest.password)) {
            Cookie cookie = new Cookie("SESSIONID", generateSessionId());
            cookie.setHttpOnly(true);
            cookie.setSecure(true);
            cookie.setPath("/");
            cookie.setMaxAge(30 * 60 *60); // 30 hours expiration

            // ✅ Attach the cookie to the response
            response.addCookie(cookie);

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
    private String generateSessionId() {
        // Generate a random session ID (in real life, use a UUID)
        return java.util.UUID.randomUUID().toString();
    }
    public static class LoginResponse {
        private String name;

        public LoginResponse(String name) {
            this.name = name;
        }
    }

    public class LoginRequest {
        private String username;
        private String password;
    }
}
