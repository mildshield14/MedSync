import React, { useState } from "react";

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

    const handleAddDevice = async () => {
        await connectToFitbit();
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
                        <input
                            className="devices__modal--input"
                            type="text"
                            placeholder="Device Name"
                            value={newDeviceName}
                            onChange={(e) => setNewDeviceName(e.target.value)}
                        />
                        <button className="devices__modal--add" onClick={handleAddDevice}>Add</button>
                        <button className="devices__modal--cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Devices;