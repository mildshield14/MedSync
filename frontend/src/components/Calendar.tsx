import React, { useState, useEffect } from "react";
import "../scss/Calendar.scss"; // Your SASS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronRight,
  faCircleChevronLeft,
  faXmark,
  faPills,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

/** Shared Event interface for both appointments & meds. */
interface CalendarEvent {
  id?: number;
  title: string;
  date: string; // e.g. "2025-03-10T20:55:16Z"
  location?: string;
  isVirtual?: string;
  dose?: string;
  type?: "appointment" | "medication"; // helps style event dots
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([]);

  /**
   * Store popup's (x, y) so we can position the event-popup near
   * the date cell – like macOS Calendar.
   */
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // 1) Load & unify your appointments/medication in useEffect
  useEffect(() => {
    // Hardcoded JSON data for testing
    const data = {
      appointments: [
        {
          title: "Blood Test",
          date: "2025-03-10T20:55:16Z",
          location: "https://www.google.fr/maps/preview",
          isVirtual: "False",
        },
        {
          title: "Follow-up Visit",
          date: "2025-03-07T20:55:16Z",
          location: "https://zoom.us/fr/signin",
          isVirtual: "True",
        },
      ],
      medication: [
        {
          id: 1,
          title: "Antibiotic", // changed "name" to "title"
          dose: "500mg",
          date: "2025-03-10T20:55:16Z",
        },
        {
          id: 2,
          title: "Panadol", // changed "name" to "title"
          dose: "200mg",
          date: "2025-03-23T20:55:16Z",
        },
      ],
    };

    // Tag each group with a type
    const mappedAppointments: CalendarEvent[] = data.appointments.map(
      (appt) => ({
        ...appt,
        type: "appointment" as const,
      }),
    );
    const mappedMedication: CalendarEvent[] = data.medication.map((med) => ({
      ...med,
      type: "medication" as const,
    }));

    // Merge into single array
    setEvents([...mappedAppointments, ...mappedMedication]);
  }, []);

  // 2) Generate an array of Date objects for the calendar (prev-month days + current-month days)
  const getCalendarDays = (): Date[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First/Last day of current month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // dayOfWeek for the 1st day (0=Sun,1=Mon,...6=Sat)
    const dayOne = firstDayOfMonth.getDay();
    // dayInMonth count (e.g. 28,30,31)
    const lastDate = lastDayOfMonth.getDate();

    // For filling in previous month's "empty" squares
    const prevLastDate = new Date(year, month, 0).getDate();

    const days: Date[] = [];

    // 2a) Add leftover days from previous month
    for (let i = dayOne; i > 0; i--) {
      days.push(new Date(year, month - 1, prevLastDate - i + 1));
    }

    // 2b) Add all days for current month
    for (let i = 1; i <= lastDate; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const calendarDays = getCalendarDays();

  // 3) Utility to check "today"
  const isToday = (day: Date) => {
    const now = new Date();
    return (
      day.getFullYear() === now.getFullYear() &&
      day.getMonth() === now.getMonth() &&
      day.getDate() === now.getDate()
    );
  };

  // 4) Utility to see if a day has at least one event
  const dayHasEvent = (day: Date) => {
    return events.some((evt) => {
      const eDate = new Date(evt.date);
      return (
        eDate.getFullYear() === day.getFullYear() &&
        eDate.getMonth() === day.getMonth() &&
        eDate.getDate() === day.getDate()
      );
    });
  };

  // 5) When user clicks a day with an event...
  const handleDayClick = (e: React.MouseEvent<HTMLLIElement>, day: Date) => {
    // Position the popup near the clicked day cell
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setPopupPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY + 25, // +25 px offset from the item
    });

    // Filter out all events on that day
    const dayEvents = events.filter((evt) => {
      const eDate = new Date(evt.date);
      return (
        eDate.getFullYear() === day.getFullYear() &&
        eDate.getMonth() === day.getMonth() &&
        eDate.getDate() === day.getDate()
      );
    });

    setSelectedEvents(dayEvents);
  };

  // 6) Navigate months
  const handlePrevClick = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };
  const handleNextClick = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  return (
    <div className="calendar-container">
      {/* HEADER */}
      <header className="calendar-header">
        <div className="calendar-navigation">
          <span
            className="calendar-navigation-chevron"
            onClick={handlePrevClick}
          >
            <FontAwesomeIcon icon={faCircleChevronLeft} />
          </span>
          <p className="calendar-current-date">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </p>
          <span
            className="calendar-navigation-chevron"
            onClick={handleNextClick}
          >
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </span>
        </div>
      </header>

      {/* BODY */}
      <div className="calendar-body">
        {/* Weekdays */}
        <ul className="calendar-weekdays">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>

        {/* Dates */}
        <ul className="calendar-dates">
          {calendarDays.map((day, index) => {
            const inCurrentMonth =
              day.getMonth() === currentDate.getMonth() &&
              day.getFullYear() === currentDate.getFullYear();

            // CSS classes for inactive / active days
            const classes = [
              inCurrentMonth ? "" : "inactive",
              isToday(day) ? "active" : "",
              dayHasEvent(day) ? "has-event" : "",
            ].join(" ");

            // Gather any events for this specific day
            const dayEvents = events.filter((evt) => {
              const evtDate = new Date(evt.date);
              return (
                evtDate.getFullYear() === day.getFullYear() &&
                evtDate.getMonth() === day.getMonth() &&
                evtDate.getDate() === day.getDate()
              );
            });

            // Build the event dots
            const dots = dayEvents.map((ev, idx) => {
              const dotClass =
                ev.type === "appointment" ? "appointment" : "medication";
              return (
                <span key={idx} className={`event-dot ${dotClass}`}></span>
              );
            });

            return (
              <li
                key={index}
                className={classes}
                onClick={(e) => {
                  // Only open the popup if there's an event
                  if (dayHasEvent(day)) {
                    handleDayClick(e, day);
                  }
                }}
              >
                {day.getDate()}
                {dots.length > 0 && <div className="event-dots">{dots}</div>}
              </li>
            );
          })}
        </ul>
      </div>

      {/* POPUP */}
      {selectedEvents.length > 0 && popupPosition && (
        <div
          className="event-popup"
          style={{
            position: "absolute",
            top: popupPosition.y,
            left: popupPosition.x,
          }}
        >
          <button
            className="event-popup__button"
            onClick={() => {
              setSelectedEvents([]);
              setPopupPosition(null);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {selectedEvents.map((event, idx) => (
            <div key={idx} className="event-popup__item">
              <h3 className="event-popup__name">
                {event.type === "medication" && (
                  <FontAwesomeIcon
                    icon={faPills}
                    className="event-popup__icon"
                  />
                )}
                {event.type === "appointment" && (
                  <FontAwesomeIcon
                    icon={faCalendarCheck}
                    className="event-popup__icon"
                  />
                )}
                {event.title}
              </h3>
              <p>Date: {new Date(event.date).toLocaleString()}</p>
              {event.location && (
                <p>
                  Location:{" "}
                  <a
                    href={event.location}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {event.location}
                  </a>
                </p>
              )}
              {event.dose && <p>Dose: {event.dose}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
