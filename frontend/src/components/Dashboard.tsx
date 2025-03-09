import React from "react";
import "../scss/Dashboard.scss";
import Calendar from "./Calendar.tsx";
import Cards from "./Cards.tsx";
import ChatbotWidget from "./ChatbotWidget.tsx";

interface DashboardProps {
    username: string | null;
}

const Dashboard: React.FC<DashboardProps> =  ({username}) => {
    console.log(username);
  return (
    <div className="dashboard">
      <h2 className="dashboard_title">Patient Overview</h2>
        <Cards />
      <h2 className="dashboard_title">Upcoming Events</h2>
      <div className="dashboard_calendar">
        <Calendar />
      </div>
        <ChatbotWidget />
    </div>
  );
};

export default Dashboard;
