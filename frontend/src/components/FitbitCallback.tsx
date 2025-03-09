import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FitbitCallback: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        if (code) {
            exchangeCodeForTokens(code);
        }
    }, [location]);

    const exchangeCodeForTokens = async (code: string) => {
        const clientId = "23Q4VM";
        const redirectUri = "http://localhost:5173/profile";
        const codeVerifier = localStorage.getItem("code_verifier");

        const tokenUrl = "https://api.fitbit.com/oauth2/token";

        const response = await fetch(tokenUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${btoa(`${clientId}:`)}`,
            },
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: "authorization_code",
                code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier || "",
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const { access_token, refresh_token } = data;

            // Save tokens in localStorage or state
            localStorage.setItem("fitbit_access_token", access_token);
            localStorage.setItem("fitbit_refresh_token", refresh_token);

            // Redirect to the profile page
            navigate("/profile");
        } else {
            console.error("Error exchanging code for tokens:", await response.text());
        }
    };

    return <div>Loading...</div>; // Return valid JSX
};

export default FitbitCallback;