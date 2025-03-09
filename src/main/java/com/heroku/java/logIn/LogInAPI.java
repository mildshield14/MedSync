package com.heroku.java.logIn;

import com.heroku.java.UserProfile;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
public class LogInAPI {
    private final LogInRepository authRepository;
    private UserProfile userProfile;
    @Autowired
    public LogInAPI(LogInRepository authRepository) {
        this.authRepository = authRepository;
    }
    @PostMapping("/login")
    public ResponseEntity<String>  login(@RequestBody LoginRequest loginRequest, HttpServletResponse response, @RequestHeader(value = "Origin", required = false) String origin) {
        authRepository.createTableIfNotExists();
        if (origin != null && (origin.equals("http://localhost:5173") || origin.equals("https://stately-crisp-851c78.netlify.app"))) {
            response.setHeader("Access-Control-Allow-Origin", origin);
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        }
        if(true){//checkAuthentification(loginRequest.username, loginRequest.password)) {
            String sessionId = generateSessionId();

            Cookie cookie = new Cookie("SESSIONID",sessionId);
            cookie.setHttpOnly(true);
            boolean isLocal = origin != null && origin.equals("http://localhost:5173");
            cookie.setSecure(!isLocal);
            cookie.setPath("/");
            cookie.setMaxAge(108000); // 30 hours expiration
            cookie.setAttribute("SameSite", "None");

            response.addCookie(cookie);

            return ResponseEntity.ok("Login successful");
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Login failed: Invalid credentials for user ");
        }

    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody LoginRequest loginRequest, HttpServletResponse response,
                                           @RequestHeader(value = "Origin", required = false) String origin,
                                           @RequestParam Long id){
        authRepository.createTableIfNotExists();
        if (origin != null && (origin.equals("http://localhost:5173") || origin.equals("https://stately-crisp-851c78.netlify.app"))) {
            response.setHeader("Access-Control-Allow-Origin", origin);
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        }
        if(authRepository.registerUser(loginRequest.username, loginRequest.password)) {
            String sessionId = generateSessionId();
            Cookie cookie = new Cookie("SESSIONID",sessionId );
            cookie.setHttpOnly(true);
            boolean isLocal = origin != null && origin.equals("http://localhost:5173");
            cookie.setSecure(!isLocal);
            cookie.setPath("/");
            cookie.setMaxAge(108000); // 30 hours expiration
            cookie.setAttribute("SameSite", "None");

            // ✅ Attach the cookie to the response
            response.addCookie(cookie);

            try {
                userProfile.createProfile(id);
            } catch (SQLException s) {
                s.printStackTrace();
            }

            return ResponseEntity.ok("Login successful");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Registration failed, please try again");
        }

    }


    @GetMapping("/username")
    public ResponseEntity<LoginResponse> getLoginInfo(Long id) {
        String name = authRepository.getUsernameById(id);
        if(name.equals("User not found")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }else {
            LoginResponse response = new LoginResponse(name);
            return ResponseEntity.ok(response);
        }
    }
    @CrossOrigin(origins = {"http://localhost:5173", "https://stately-crisp-851c78.netlify.app"}, allowCredentials = "true")
    @RequestMapping(value = "/login", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handlePreflightLogin(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");

        return ResponseEntity.ok().build();
    }

    @CrossOrigin(origins = {"http://localhost:5173", "https://stately-crisp-851c78.netlify.app"}, allowCredentials = "true")
    @RequestMapping(value = "/register", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handlePreflightRegister(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");

        return ResponseEntity.ok().build();
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

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}