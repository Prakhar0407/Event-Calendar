import React, { useState, useEffect } from 'react';
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, addMonths, subMonths, isSameDay
} from 'date-fns';

import EventForm from './components/EventForm';
import CalendarDay from './components/CalendarDay';
import { DragDropContext } from 'react-beautiful-dnd'; // ✅ ADD THIS

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem('events')) || []);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    setEvents([...events, event]);
    setSelectedDate(null);
  };

  const updateEvent = (updated) => {
    setEvents(events.map((e) => (e.id === updated.id ? updated : e)));
    setEditingEvent(null);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    setEditingEvent(null);
  };

  // ✅ DRAG EVENT ACROSS DATES
  const handleDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const draggedEvent = events.find((e) => e.id.toString() === draggableId);
    if (!draggedEvent) return;

    const newDate = new Date(destination.droppableId);
    if (!newDate) return;

    const updatedEvent = { ...draggedEvent, date: newDate };
    setEvents(events.map((e) => (e.id === draggedEvent.id ? updatedEvent : e)));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Event Calendar</h1>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>Previous</button>
        <strong style={{ margin: '0 1rem' }}>{format(currentMonth, 'MMMM yyyy')}</strong>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>Next</button>
      </div>

      <div style={{ textAlign: 'center', margin: '1rem' }}>
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '0.5rem', width: '300px' }}
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="calendar">
          {days.map((day, index) => (
            <CalendarDay
              key={index}
              day={day}
              events={events.filter((e) =>
                isSameDay(new Date(e.date), day) &&
                (e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 e.description?.toLowerCase().includes(searchQuery.toLowerCase()))
              )}
              onAdd={() => setSelectedDate(day)}
              onEdit={setEditingEvent}
            />
          ))}
        </div>
      </DragDropContext>

      {selectedDate && (
        <EventForm
          date={selectedDate}
          onSave={addEvent}
          onCancel={() => setSelectedDate(null)}
        />
      )}
      {editingEvent && (
        <EventForm
          event={editingEvent}
          onSave={updateEvent}
          onDelete={deleteEvent}
          onCancel={() => setEditingEvent(null)}
        />
      )}
    </div>
  );
};

export default App;
