import React, { useState, useEffect } from "react";
import "../scss/Cards.scss";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface HealthData {
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  heartRate?: number;
}

interface HeartRatePoint {
  time: string; // e.g. "10:00 AM"
  bpm: number; // e.g. 72
}

const Cards: React.FC = () => {
  // State to store the latest snapshot of health data
  const [healthData, setHealthData] = useState<HealthData | null>(null);

  // State to store timeseries heart rate data for chart
  const [heartRateData, setHeartRateData] = useState<HeartRatePoint[]>([]);

  // Fetch data from your backend on mount
  useEffect(() => {
    async function fetchHealthData() {
      try {
        // Example GET request (replace URL with your actual endpoint)
        // const response = await fetch("http://localhost:8080/api/fitbit-data");
        // if (!response.ok) {
        //     throw new Error("Failed to fetch data");
        // }
        // const data = await response.json();

        const data = {
          bloodPressure: { systolic: 125, diastolic: 85 },
          heartRate: 73,
          heartRateTimeseries: [
            { time: "10:00 AM", bpm: 68 },
            { time: "10:15 AM", bpm: 72 },
            { time: "10:30 AM", bpm: 75 },
            { time: "10:45 AM", bpm: 70 },
            { time: "11:00 AM", bpm: 78 },
          ],
        };

        // Data structure depends on how your backend responds
        // Example data:
        // {
        //   bloodPressure: { systolic: 120, diastolic: 80 },
        //   heartRate: 72,
        //   heartRateTimeseries: [
        //     { time: "10:00 AM", bpm: 68 },
        //     { time: "10:15 AM", bpm: 72 },
        //     ...
        //   ]
        // }

        setHealthData({
          bloodPressure: data.bloodPressure,
          heartRate: data.heartRate,
        });

        if (data.heartRateTimeseries) {
          setHeartRateData(data.heartRateTimeseries);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchHealthData();
  }, []);

  // Example fallback if data is not yet loaded
  const bloodPressureText = healthData?.bloodPressure
    ? `${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic}`
    : "Loading...";

  const heartRateText = healthData?.heartRate
    ? `${healthData.heartRate} BPM`
    : "Loading...";

  return (
    <div className="dashboard_card-container">
      <div className="dashboard_card">
        <h3 className="dashboard_card-name">Blood Pressure</h3>
        <p className="dashboard_card-content">Current: {bloodPressureText}</p>
        <p className="dashboard_card-content">Trend: Stable</p>
      </div>

      <div className="dashboard_card">
        <h3 className="dashboard_card-name">Heart Monitoring</h3>
        <p className="dashboard_card-content">Heartbeat: {heartRateText}</p>
        <p className="dashboard_card-content">Status: Normal</p>

        {/* Heart Rate Chart */}
        <div className="dashboard_card-chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={heartRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                scale="point"
                dataKey="time"
                type="category"
                tick={{ fontSize: 10 }}
                angle={-90}
                textAnchor="end"
                interval={0}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="bpm"
                stroke="var(--secondary-color)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard_card">
          <h3 className="dashboard_card-name">Medication</h3>
          <p className="dashboard_card-content">Next Dose: 9:00 AM</p>
          <p className="dashboard_card-content">Upcoming: Antibiotics</p>
      </div>

      <div className="dashboard_card">
          <h3 className="dashboard_card-name">Appointments</h3>
          <p className="dashboard_card-content">Next: Sep 15, 10:00 AM</p>
          <p className="dashboard_card-content">Location: Clinic A</p>
      </div>
    </div>
  );
};

export default Cards;
