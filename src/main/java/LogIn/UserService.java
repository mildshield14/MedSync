package LogIn;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

public class UserService {
    private static Map<String, String> users = new HashMap<>();
    private static final String DB_URL = System.getenv("DATABASE_URL");

    // You can parse the URL to get the actual username and password
    // Example URL: postgres://username:password@hostname:port/database
    private static final String DB_USER = "udk67lmnt0m2co\n";
    private static final String DB_PASSWORD = "p256c91a6841e88efca3a9caed92ed5c24cd04c7969d0ca7b457d3508651f4d68";

    // Authenticate user
    public boolean authenticate(String username, String password) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String query = "SELECT password FROM users WHERE username = ?";
            try (PreparedStatement stmt = connection.prepareStatement(query)) {
                stmt.setString(1, username);

                try (ResultSet rs = stmt.executeQuery()) {
                    if (rs.next()) {
                        String storedPassword = rs.getString("password");
                        return storedPassword.equals(password);  // You should hash passwords in production
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    // Register a new user
    public void registerUser(String username, String password) {
        users.put(username, password);
    }
}

