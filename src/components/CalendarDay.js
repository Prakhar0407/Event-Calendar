import React from "react";
import { format, isToday } from "date-fns";

const CalendarDay = ({ day, events, onAdd, onEdit }) => {
  return (
    <div className={`day ${isToday(day) ? "today" : ""}`} onDoubleClick={onAdd}>
      <div className="date">{format(day, "d")}</div>
      {events.map((event) => (
        <div
          key={event.id}
          className="event"
          style={{ backgroundColor: event.color || "#007bff" }}
          onClick={() => onEdit(event)}
        >
          {event.title}
        </div>
      ))}
    </div>
  );
};

export default CalendarDay;
