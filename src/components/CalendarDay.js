import React from "react";
import { format, isToday } from "date-fns";
import { Droppable, Draggable } from "react-beautiful-dnd";
const CalendarDay = ({ day, events, onAdd, onEdit }) => {
  return (
    <Droppable droppableId={day.toISOString()}>
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
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    backgroundColor: event.color || "#007bff",
                    ...provided.draggableProps.style,
                  }}
                  onClick={() => onEdit(event)}
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
