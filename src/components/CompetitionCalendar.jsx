import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { Modal, Button } from 'react-bootstrap';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enIN from 'date-fns/locale/en-IN';


import 'react-big-calendar/lib/css/react-big-calendar.css';
import { categories } from '../data/categories';
import { formatDate, formatTime } from '../utils/helpers';

const locales = { 'en-IN': enIN };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales
});

const CompetitionCalendar = ({ competitions, isRegistered }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState(Views.MONTH); //  control the view
  const [date, setDate] = useState(new Date());  // control the date

  const calendarEvents = competitions.map(comp => ({
    id: comp.id,
    title: comp.title + (isRegistered(comp.id) ? ' (Registered)' : ''),
    start: new Date(comp.date + 'T' + (comp.time || '00:00')),
    end: new Date(comp.date + 'T' + (comp.time || '23:59')),
    allDay: false,
    resource: comp
  }));

  return (
    <>
      <div className="bg-white p-3 rounded shadow-sm">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          view={view}                      // ✅ control view
          onView={(newView) => setView(newView)}
          date={date}                      // ✅ control date
          onNavigate={(newDate) => setDate(newDate)}
          style={{ height: 500 }}
          popup
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: isRegistered(event.id) ? '#198754' : '#adb5bd',
              color: 'white',
              borderRadius: '6px',
              border: 'none'
            }
          })}
          onSelectEvent={(event) => setSelectedEvent(event.resource)}
        />
      </div>

      {/* Modal for event details */}
      {selectedEvent && (
        <Modal show onHide={() => setSelectedEvent(null)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Date:</strong> {formatDate(selectedEvent.date)}</p>
            <p><strong>Time:</strong> {formatTime(selectedEvent.time)}</p>
            <p><strong>Venue:</strong> {selectedEvent.venue}</p>
            <p><strong>Category:</strong> {categories.find(c => c.value === selectedEvent.category)?.label}</p>
            <p><strong>Description:</strong> {selectedEvent.description}</p>
            <p><strong>Organiser:</strong> {selectedEvent.organizer}</p>
            <p><strong>Registration Deadline:</strong> {formatDate(selectedEvent.registrationDeadline)}</p>
            <p><strong>Prizes:</strong> {selectedEvent.prizes || 'N/A'}</p>
            <p><strong>Contact:</strong> {selectedEvent.contactEmail}{selectedEvent.contactPhone && ` | ${selectedEvent.contactPhone}`}</p>
            <p>
              <strong>Status:</strong>{' '}
              {selectedEvent.status === 'upcoming' ? (
                <span className="badge bg-success">Upcoming</span>
              ) : (
                <span className="badge bg-secondary">Completed</span>
              )}
            </p>
            <p>
              <strong>Registered:</strong>{' '}
              {isRegistered(selectedEvent.id) ? (
                <span className="badge bg-success">Yes</span>
              ) : (
                <span className="badge bg-secondary">No</span>
              )}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedEvent(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CompetitionCalendar;
