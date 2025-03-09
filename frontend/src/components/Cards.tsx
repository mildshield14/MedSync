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
import CardsDB from "./CardsDB.tsx";

interface HealthData {
  heartRate?: number;
  sleepData?: SleepDataPoint[];
}

interface HeartRatePoint {
  time: string; // e.g. "10:00 AM"
  bpm: number; // e.g. 72
}

interface SleepDataPoint {
  date: string; // e.g. "2023-09-15"
  duration: number; // e.g. 480 (minutes)
}

const Cards: React.FC = () => {
  // State to store the latest snapshot of health data
  const [healthData, setHealthData] = useState<HealthData | null>(null);

  // State to store timeseries heart rate data for chart
  const [heartRateData, setHeartRateData] = useState<HeartRatePoint[]>([]);

  // State to store timeseries sleep data for chart
  const [sleepData, setSleepData] = useState<SleepDataPoint[]>([]);

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
          heartRate: 73,
          heartRateTimeseries: [
            { time: "10:00 AM", bpm: 68 },
            { time: "10:15 AM", bpm: 72 },
            { time: "10:30 AM", bpm: 75 },
            { time: "10:45 AM", bpm: 70 },
            { time: "11:00 AM", bpm: 78 },
          ],
          sleepData: [
            { date: "2023-09-15", duration: 480 },
            { date: "2023-09-16", duration: 450 },
            { date: "2023-09-17", duration: 500 },
            { date: "2023-09-18", duration: 470 },
            { date: "2023-09-19", duration: 460 },
          ],
        };

        setHealthData({
          heartRate: data.heartRate,
          sleepData: data.sleepData,
        });

        if (data.heartRateTimeseries) {
          setHeartRateData(data.heartRateTimeseries);
        }

        if (data.sleepData) {
          setSleepData(data.sleepData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchHealthData();
  }, []);

  const heartRateText = healthData?.heartRate
      ? `${healthData.heartRate} BPM`
      : "Loading...";

  return (
      <div className="dashboard_card-container">
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
          <h3 className="dashboard_card-name">Sleep Data</h3>
          <p className="dashboard_card-content">Trend: Stable</p>

          {/* Sleep Data Chart */}
          <div className="dashboard_card-chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    scale="point"
                    dataKey="date"
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
                    dataKey="duration"
                    stroke="var(--secondary-color)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
<CardsDB />
        {/*<div className="dashboard_card">*/}
        {/*  <h3 className="dashboard_card-name">Medication</h3>*/}
        {/*  <p className="dashboard_card-content">Next Dose: 9:00 AM</p>*/}
        {/*  <p className="dashboard_card-content">Upcoming: Antibiotics</p>*/}
        {/*</div>*/}

        {/*<div className="dashboard_card">*/}
        {/*  <h3 className="dashboard_card-name">Appointments</h3>*/}
        {/*  <p className="dashboard_card-content">Next: Sep 15, 10:00 AM</p>*/}
        {/*  <p className="dashboard_card-content">Location: Clinic A</p>*/}
        {/*</div>*/}
      </div>
  );
};

export default Cards;