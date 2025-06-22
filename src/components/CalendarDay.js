import React from "react";
import { format, isToday } from "date-fns";
import { Droppable, Draggable } from "react-beautiful-dnd";

const CalendarDay = ({ day, events, onAdd, onEdit }) => {
  return (
    <Droppable droppableId={day.toString()}>
      {(provided) => (
        <div
          className={`day ${isToday(day) ? "today" : ""}`}
          onDoubleClick={onAdd}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="date">{format(day, "d")}</div>

          {events.map((event, index) => (
            <Draggable
              key={event.id}
              draggableId={event.id.toString()}
              index={index}
            >
              {(provided) => (
                <div
                  className="event"
                  style={{ backgroundColor: event.color || "#007bff" }}
                  onClick={() => onEdit(event)}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {event.title}
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default CalendarDay;
