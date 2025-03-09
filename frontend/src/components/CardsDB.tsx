import React, { useState, useEffect } from "react";
import "../scss/Cards.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTablets, faPills, faCapsules, faPhone, faCalendarDays, faHospital} from '@fortawesome/free-solid-svg-icons'


interface Appointment {
    id: string;
    title: string;
    date: string;
    location?: string;
}

interface Medicament {
    id: string;
    name: string;
    dose: string;
    nextDoseTime: string;
}

const Cards: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [medicaments, setMedicaments] = useState<Medicament[]>([]);

    const iconsMed = [faTablets, faPills, faCapsules];
    const iconsApp = [faPhone, faCalendarDays, faHospital];

// Function to get a random icon
    const getRandomIcon = (isMed: boolean) => {
        const randomIndex = Math.floor(Math.random() * iconsApp.length);
        if (isMed) {
            return iconsMed[randomIndex];
        }
        else{
            return iconsApp[randomIndex];
        }
    };
    useEffect(() => {
        async function fetchData() {
            try {
                // Simulated API call for appointments (replace with your actual endpoint)
                const appointmentsData: Appointment[] = [
                    { id: "1", title: "Blood Test", date: "2023-09-20T09:00:00Z", location: "Clinic A" },
                    { id: "2", title: "Follow-up Visit", date: "2023-09-22T14:30:00Z", location: "Clinic B" },
                    { id: "3", title: "Consultation", date: "2023-09-25T10:15:00Z", location: "Clinic C" },
                    // Add more if needed...
                ];

                // Simulated API call for medicaments (replace with your actual endpoint)
                const medicamentsData: Medicament[] = [
                    { id: "1", name: "Antibiotic", dose: "500mg", nextDoseTime: "2023-09-20T08:00:00Z" },
                    { id: "5", name: "Insulin", dose: "10 units", nextDoseTime: "2023-09-20T07:30:00Z" },
                    { id: "2", name: "Panadol", dose: "200mg", nextDoseTime: "2023-09-20T12:00:00Z" },
                    { id: "3", name: "Vitamin D", dose: "1000IU", nextDoseTime: "2023-09-21T07:00:00Z" },
                    { id: "4", name: "Insulin", dose: "10 units", nextDoseTime: "2023-09-20T07:30:00Z" },
                    { id: "6", name: "Antibiotic", dose: "500mg", nextDoseTime: "2023-09-20T08:00:00Z" },
                ];

                // In a real scenario, you might call:
                // const responseAppointments = await fetch("http://localhost:8080/api/appointments");
                // const appointmentsData = await responseAppointments.json();
                // And similarly for medicaments.

                setAppointments(appointmentsData);
                setMedicaments(medicamentsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="dashboard_card-container">
            {/* Appointments Card */}
            <div className="dashboard_card">
                <h3 className="dashboard_card-name">Appointments</h3>
                <div className="dashboard_card-scroll">
                    {appointments.map((appt) => (
                        <div key={appt.id} className="dashboard_card-item">
                            <p className="dashboard_card-item-title"> <FontAwesomeIcon icon={getRandomIcon(false)} style={{marginRight:'8px'}}/> {appt.title}</p>
                            <p className="dashboard_card-item-date">
                                {new Date(appt.date).toLocaleString()}
                            </p>
                            {appt.location && (
                                <p className="dashboard_card-item-location">{appt.location}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Medicaments Card */}
            <div className="dashboard_card">
                <h3 className="dashboard_card-name">Medicaments</h3>
                <div className="dashboard_card-scroll">
                    {medicaments.map((med) => (
                        <div key={med.id} className="dashboard_card-item">
                            <p className="dashboard_card-item-title"> <FontAwesomeIcon icon={getRandomIcon(true)}  style={{marginRight:'8px'}} />{med.name}</p>
                            <p className="dashboard_card-item-dose">Dose: {med.dose}</p>
                            <p className="dashboard_card-item-time">
                                Next Dose: {new Date(med.nextDoseTime).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cards;
