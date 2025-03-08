package LogIn;


import jakarta.servlet.*;
import jakarta.servlet.http.*;
import java.io.IOException;

public class LogInAPI extends HttpServlet {
    private UserService userService;

    @Override
    public void init() throws ServletException {
        userService = new UserService();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if (userService.authenticate(username, password)) {
            response.getWriter().write("Login successful!");
        } else {
            response.getWriter().write("Invalid username or password.");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Display login form if GET request is received
        response.setContentType("text/html");
        response.getWriter().write("<html><body><form method='POST' action='/login'>"
                + "Username: <input type='text' name='username' /><br>"
                + "Password: <input type='password' name='password' /><br>"
                + "<input type='submit' value='Login' />"
                + "</form></body></html>");
    }
}

