import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import ChatbotWidget from '../components/ChatbotWidget'
import "../scss/Dashboard.scss"
import Calendar from "./Calendar.tsx";

const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState<any>(null)

    const [dummyEvents] = useState([
        { date: 5, title: "Blood Test" },
        { date: 12, title: "X-Ray" },
        { date: 18, title: "Follow-up Visit" }
    ])

    const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1)


    useEffect(() => {
        // Example call to your Spring Boot backend
        // axios.get('http://localhost:8080/api/user')
        //     .then((response) => setUserData(response.data))
        //     .catch((error) => console.error(error))
    }, [])

    return (
        <div className="dashboard">
            <h2 className="dashboard_title">Patient Overview</h2>
            <div className="dashboard_card-container">

                <div className="dashboard_card">
                    <h3 className="dashboard_card-name">Blood Pressure</h3>
                    <p className="dashboard_card-content">Current: 120/80</p>
                    <p className="dashboard_card-content">Trend: Stable</p>
                </div>

                <div className="dashboard_card">
                    <h3 className="dashboard_card-name">Heart Monitoring</h3>
                    <p className="dashboard_card-content">Heartbeat: 72 BPM</p>
                    <p className="dashboard_card-content">Status: Normal</p>
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
            <h2 className="dashboard_title">Upcoming Events</h2>
            <div className="dashboard_calendar">
                <Calendar />
            </div>
        </div>
    )

}

export default Dashboard;
