import React, { useState } from "react";

const recurrenceOptions = ["None", "Daily", "Weekly", "Monthly", "Custom"];

const EventForm = ({ date, event, onSave, onCancel, onDelete }) => {
  const [title, setTitle] = useState(event?.title || "");
  const [time, setTime] = useState(event?.time || "12:00");
  const [desc, setDesc] = useState(event?.desc || "");
  const [recurrence, setRecurrence] = useState(
    event?.recurrence?.startsWith("Custom:") ? "Custom" : event?.recurrence || "None"
  );
  const [customRecurrence, setCustomRecurrence] = useState(
    event?.recurrence?.startsWith("Custom:") ? event.recurrence.slice(7) : ""
  );
  const [color, setColor] = useState(event?.color || "");

  const handleSubmit = () => {
    const finalRecurrence = recurrence === "Custom" ? `Custom:${customRecurrence}` : recurrence;

    const newEvent = {
      id: event?.id || Date.now(),
      title,
      desc,
      time,
      date: date || event.date,
      recurrence: finalRecurrence,
      color,
    };
    onSave(newEvent);
  };

  return (
    <div
      className="event-form"
      style={{
        backgroundColor: event ? "#f5f5dc" : "#ffffff",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        margin: "1rem auto",
        maxWidth: "400px",
      }}
    >
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
        {recurrenceOptions.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>

      {recurrence === "Custom" && (
        <input
          type="text"
          placeholder="e.g. Every 2nd Friday"
          value={customRecurrence}
          onChange={(e) => setCustomRecurrence(e.target.value)}
        />
      )}

      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleSubmit}>Save</button>
        {onDelete && <button onClick={() => onDelete(event.id)}>Delete</button>}
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EventForm;
