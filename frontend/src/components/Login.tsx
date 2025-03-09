import React, { useState } from "react";
import "../scss/Login.scss";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import  axios from "axios";

interface LoginProps {
    onLogin: (username: string, password: string) => void;
    isAuthenticated: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, isAuthenticated }) => {
    // Toggle for password visibility
    const [type, setType] = useState<"password" | "text">("password");
    const [icon, setIcon] = useState<IconDefinition>(faEyeSlash);

    // Toggle handler
    const handleToggle = () => {
        if (type === "password") {
            setType("text");
            setIcon(faEye);
        } else {
            setType("password");
            setIcon(faEyeSlash);
        }
    };

    // Existing login logic
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // If user is already authenticated, redirect to /home
    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Attempting login with:", formData);

         try {
         //    const response = await axios.post(
         //        "https://infinite-woodland-18234-54abcbbed8a7.herokuapp.com/login",
         //        formData,
         //        {
         //            withCredentials: true,
         //        }
         //    );
         //    const data = response.data;
         //    console.log("Login response:", data);

            const data = {
                "username": "username1",
                "password": "password1"
            }

            if (data.username) {
                setErrorMessage(null);
                onLogin(formData.username, formData.password);
            } else {
                setErrorMessage("Invalid username or password. Please try again.");
                console.error("Invalid response:", data);
            }

        } catch (error) {
            setErrorMessage("Login failed. Please try again.");
            console.error("Login failed:", error);
        }
    };

    return (
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form__title">Login Page</h1>

        <input
          className="form__elem form__elem__username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <div className="form__elem form__elem__pwd-container">
          <input
            className="form__elem__pwd"
            type={type}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <span className="form__elem__pwd-icon" onClick={handleToggle}>
            <FontAwesomeIcon icon={icon} />
          </span>
        </div>


        <button className="form__elem form__elem__submit-button" type="submit">
          Login
        </button>

        {errorMessage && <div className="form__error">{errorMessage}</div>}
      </form>
    );
};

export default Login;
