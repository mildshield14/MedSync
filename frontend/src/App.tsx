import "./scss/globals.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useRef, useState } from "react";

import Login from "./components/Login";
import useElementSize from "./hook/useElementSize";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile.tsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Check localStorage on first load (if you still want that fallback)
  useEffect(() => {
    const storedUsername = localStorage.getItem("userConnected");
    if (storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  const navigate = useNavigate();

  // Example breakpoints for useElementSize
  const ref = useRef<HTMLDivElement>(null);
  const breakpoints = {
    small: { min: 300, max: 599 },
    medium: { min: 600, max: 899 },
    large: { min: 900, max: 1399 },
    extra: { min: 1400, max: Infinity },
  };
  const size = useElementSize(ref, breakpoints);

  /**
   * handleLogin is called by <Login> after a successful response
   * from the remote server. We store username in state, localStorage, etc.
   */
  const handleLogin = (username: string, password: string) => {
    // For now, just mark them as "authenticated"
    setIsAuthenticated(true);
    setUsername(username);

    // Optionally store in localStorage
    localStorage.setItem("userConnected", username);
    navigate("/home");
    // TODO: If using session cookies, you'd do a "GET /me" fetch here to confirm
    // the backend recognizes the session. This is optional if your remote
    // login endpoint already sets a cookie.
  };

  /**
   * handleLogout: remove localStorage and set isAuthenticated to false
   */
  const handleLogout = () => {
    localStorage.removeItem("userConnected");
    setIsAuthenticated(false);
    // setUsern// fetch("http://localhost:8080/logout", {
    //   method: "POST",
    //   credentials: "include",
    // });ame(null);

    // TODO: If you have a /logout endpoint, call it with credentials:
  };

  return (
    <div className={`${size} app`} ref={ref}>
      {/* Show the same Navbar, just pass isAuthenticated for conditional links */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            <Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>

        {/* Protected Dashboard */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard username={username} />
            </ProtectedRoute>
          }
        />

        {/* Fallback: if logged in, go Dashboard; else go Login */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Dashboard username={username} />
            ) : (
              <Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
