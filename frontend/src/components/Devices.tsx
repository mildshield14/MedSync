import React, { useState } from "react";

const generateCodeVerifier = () => {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) =>
        byte.toString(16).padStart(2, "0")
    ).join("");
};

const generateCodeChallenge = async (codeVerifier: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
};

const connectToFitbit = async () => {
    const clientId = "23Q4VM"; // Replace with your Fitbit client ID
    const scope = encodeURIComponent("activity heartrate sleep"); // Replace with your desired scopes
    const redirectUri = encodeURIComponent("http://localhost:5173/profile"); // Replace with your redirect URI

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Save the code verifier in localStorage for later use
    localStorage.setItem("code_verifier", codeVerifier);

    const authUrl = `https://www.fitbit.com/oauth2/authorize?client_id=${clientId}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256&scope=${scope}&redirect_uri=${redirectUri}`;
    console.log(authUrl);
    window.location.href = authUrl;
};

interface Device {
    id: string;
    name: string;
    type: string;
    status: "connected" | "disconnected";
}

interface DevicesProps {
    devices: Device[];
    onAddDevice: (device: Device) => void;
}

const Devices: React.FC<DevicesProps> = ({ devices, onAddDevice }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDeviceName, setNewDeviceName] = useState("");

    const handleAddDevice = () => {
        const newDevice: Device = {
            id: String(devices.length + 1),
            name: newDeviceName,
            type: "Fitbit",
            status: "connected",
        };
        onAddDevice(newDevice);
        setIsModalOpen(false);
        setNewDeviceName("");
    };

    return (
        <div className="devices">
            <h3 className="devices__title">Connected Devices</h3>
            <div className="devices__list">
                {devices.map((device) => (
                    <div key={device.id} className="devices__item">
                        <span className="devices__item-name">{device.name}</span>
                        <span
                            className={`devices__item-status devices__item-status--${device.status}`}
                        >
              {device.status}
            </span>
                    </div>
                ))}
            </div>

            <button
                className="devices__add-button"
                onClick={() => setIsModalOpen(true)}
            >
                +
            </button>

            {isModalOpen && (
                <div className="devices__modal">
                    <div className="devices__modal-content">
                        <h3 className="devices__modal--text">Add Device</h3>
                        <input className="devices__modal--input"
                               type="text"
                               placeholder="Device Name"
                               value={newDeviceName}
                               onChange={(e) => setNewDeviceName(e.target.value)}
                        />
                        <button className="devices__modal--add" onClick={connectToFitbit}>Add</button>
                        <button className="devices__modal--cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Devices;