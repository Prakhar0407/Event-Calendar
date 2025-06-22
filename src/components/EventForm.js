import React, { useState } from 'react';

const recurrenceOptions = ['None', 'Daily', 'Weekly', 'Monthly'];

const EventForm = ({ date, event, onSave, onCancel, onDelete }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [time, setTime] = useState(event?.time || '12:00');
  const [desc, setDesc] = useState(event?.desc || '');
  const [recurrence, setRecurrence] = useState(event?.recurrence || 'None');
  const [color, setColor] = useState(event?.color || '');

  const handleSubmit = () => {
    const newEvent = {
      id: event?.id || Date.now(),
      title,
      desc,
      time,
      date: date || event.date,
      recurrence,
      color,
    };
    onSave(newEvent);
  };

  return (
    <div className="event-form">
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <select value={recurrence} onChange={e => setRecurrence(e.target.value)}>
        {recurrenceOptions.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <input type="color" value={color} onChange={e => setColor(e.target.value)} />

      <div>
        <button onClick={handleSubmit}>Save</button>
        {onDelete && <button onClick={() => onDelete(event.id)}>Delete</button>}
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EventForm;

