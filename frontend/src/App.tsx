import "./scss/globals.scss";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Login from "./components/Login";
import useElementSize from "./hook/useElementSize";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile.tsx";
import FitbitCallback from "./components/FitbitCallback.tsx";
import Scene from "./Scene.jsx"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Check localStorage on first load
  useEffect(() => {
    const storedUsername = localStorage.getItem("userConnected");
    if (storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    } else {
      setIsAuthenticated(false); // Ensure isAuthenticated is false if no user is logged in
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
  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setUsername(username);
    localStorage.setItem("userConnected", username);
    navigate("/home");
  };

  /**
   * handleLogout: remove localStorage and set isAuthenticated to false
   */
  const handleLogout = () => {
    localStorage.removeItem("userConnected");
    localStorage.removeItem("fitbit_access_token");
    localStorage.removeItem("fitbit_refresh_token");
    setIsAuthenticated(false);
    navigate("/login");
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

          {/* Profile Route */}
          <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              }
          />

          {/* Fitbit Callback Route */}
          <Route
              path="/fitbit-callback"
              element={<FitbitCallback />}
          />

            <Route
                path="/chatbot"
                element={
                    <Scene />
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