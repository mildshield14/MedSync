import "./scss/globals.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import Login from "./components/Login";
import useElementSize from "./hook/useElementSize";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import FitbitCallback from "./components/FitbitCallback";
import ChatbotFullScreen from "./components/Chatbox.tsx";

function App() {
    // Initialize state from localStorage so on first render the values are correct.
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("userConnected")
    );
    const [username, setUsername] = useState<string | null>(
        localStorage.getItem("userConnected")
    );

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
     * handleLogin is called by <Login> after a successful login.
     * We update state, store in localStorage, and navigate to /home.
     */
    const handleLogin = (username: string) => {
        setIsAuthenticated(true);
        setUsername(username);
        localStorage.setItem("userConnected", username);
        navigate("/home");
    };

    /**
     * handleLogout: remove stored data and update state.
     */
    const handleLogout = () => {
        localStorage.removeItem("userConnected");
        localStorage.removeItem("fitbit_access_token");
        localStorage.removeItem("fitbit_refresh_token");
        setIsAuthenticated(false);
        setUsername(null);
        navigate("/login");
    };

    return (
        <div className={`${size} app`} ref={ref}>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

            <Routes>
                {/* Login Route */}
                <Route
                    path="/login"
                    element={<Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />}
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
                <Route path="/fitbit-callback" element={<FitbitCallback />} />

                {/* Chatbot Route */}
                <Route path="/chatbot" element={<ChatbotFullScreen />} />

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
