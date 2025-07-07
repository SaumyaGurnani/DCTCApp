import React, { useState } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import CompetitionCard from '../components/CompetitionCard';
import CompetitionFilters from '../components/CompetitionFilters';
import CompetitionFormModal from '../components/CompetitionFormModal';
import CompetitionCalendar from '../components/CompetitionCalendar';
// (You'll add FormModal and Calendar later)
import { Views } from 'react-big-calendar';


import { categories } from '../data/categories';

const TheaterCircuitApp = () => {
  const [currentView, setCurrentView] = useState('competitions');
  const [competitions, setCompetitions] = useState([
    {
      id: 1,
      title: "Annual Drama Festival",
      organizer: "Delhi University Theatre Society",
      date: "2025-08-15",
      time: "18:00",
      venue: "Kamala Nehru College Auditorium",
      category: "stage",
      description: "Annual inter-college drama competition featuring original scripts and adaptations",
      registrationLink: "https://forms.google.com/drama-festival-2025",
      registrationDeadline: "2025-08-01",
      maxTeams: 15,
      registeredTeams: 8,
      prizes: "₹25,000 for winners",
      contactEmail: "drama.du@gmail.com",
      contactPhone: "+91-9876543210",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Street Play Championship",
      organizer: "Hansraj College Dramatic Society",
      date: "2025-07-20",
      time: "16:00",
      venue: "Central Park, CP",
      category: "street",
      description: "Social awareness street play competition with themes on current issues",
      registrationLink: "https://forms.google.com/street-play-championship",
      registrationDeadline: "2025-07-15",
      maxTeams: 20,
      registeredTeams: 12,
      prizes: "₹15,000 for winners",
      contactEmail: "hansraj.drama@gmail.com",
      contactPhone: "+91-9876543211",
      status: "upcoming"
    }
  ]);

  const [registrations, setRegistrations] = useState([
    { competitionId: 1, teamName: "Miranda Drama Club", registeredAt: "2025-07-01" }
  ]);

  const [calendarView, setCalendarView] = useState(Views.MONTH);
const [calendarDate, setCalendarDate] = useState(new Date());

  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState(null);
  const [newCompetition, setNewCompetition] = useState({
  title: '', organizer: '', date: '', time: '', venue: '', category: 'stage',
  description: '', registrationLink: '', registrationDeadline: '', maxTeams: '',
  prizes: '', contactEmail: '', contactPhone: ''
});


  const myTeamName = "Miranda Drama Club";

  const isRegistered = (competitionId) =>
    registrations.some(reg => reg.competitionId === competitionId && reg.teamName === myTeamName);

  const handleRegister = (competition) => {
    if (isRegistered(competition.id)) {
      alert("Already registered.");
      return;
    }
    setRegistrations([...registrations, {
      competitionId: competition.id,
      teamName: myTeamName,
      registeredAt: new Date().toISOString().slice(0, 10)
    }]);

    setCompetitions(competitions.map(c =>
      c.id === competition.id
        ? { ...c, registeredTeams: (c.registeredTeams || 0) + 1 }
        : c
    ));
  };

  const handleUnregister = (competition) => {
    setRegistrations(registrations.filter(reg =>
      !(reg.competitionId === competition.id && reg.teamName === myTeamName)
    ));

    setCompetitions(competitions.map(c =>
      c.id === competition.id
        ? { ...c, registeredTeams: Math.max((c.registeredTeams || 1) - 1, 0) }
        : c
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this competition?')) {
      setCompetitions(competitions.filter(c => c.id !== id));
      setRegistrations(registrations.filter(r => r.competitionId !== id));
    }
  };

  const handleEdit = (competition) => {
  setEditingCompetition(competition);
  setNewCompetition({ ...competition });
  setShowModal(true);
};

  const filteredCompetitions = competitions.filter(comp => {
    const matchCategory = filterCategory === 'all' || comp.category === filterCategory;
    const matchStatus = filterStatus === 'all' || comp.status === filterStatus;
    const matchSearch = comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchStatus && matchSearch;
  });

  return (
    <div className="bg-light min-vh-100">
      {/* Header */}
      <Nav className="bg-white shadow-sm px-4 py-2 justify-content-between align-items-center">
        <Nav.Item className="fw-bold">
          <i className="bi bi-masks-theater text-primary me-2"></i>
          Delhi Theatre Circuit
        </Nav.Item>
        <Nav.Item>
          <Button
            variant={currentView === 'competitions' ? 'primary' : 'outline-primary'}
            className="me-2"
            onClick={() => setCurrentView('competitions')}
          >
            Competitions
          </Button>
          <Button
            variant={currentView === 'calendar' ? 'primary' : 'outline-primary'}
            onClick={() => setCurrentView('calendar')}
          >
            Calendar
          </Button>
        </Nav.Item>
      </Nav>
        <CompetitionFormModal
  show={showModal}
  onHide={() => {
    setShowModal(false);
    setEditingCompetition(null);
    setNewCompetition({
      title: '', organizer: '', date: '', time: '', venue: '', category: 'stage',
      description: '', registrationLink: '', registrationDeadline: '', maxTeams: '',
      prizes: '', contactEmail: '', contactPhone: ''
    });
  }}
  onSubmit={() => {
    const comp = {
      ...newCompetition,
      id: editingCompetition ? editingCompetition.id : Date.now(),
      registeredTeams: editingCompetition ? editingCompetition.registeredTeams : 0,
      status: new Date(newCompetition.date) > new Date() ? 'upcoming' : 'completed'
    };

    if (editingCompetition) {
      setCompetitions(prev => prev.map(c => c.id === comp.id ? comp : c));
    } else {
      setCompetitions(prev => [...prev, comp]);
    }

    setShowModal(false);
    setEditingCompetition(null);
    setNewCompetition({
      title: '', organizer: '', date: '', time: '', venue: '', category: 'stage',
      description: '', registrationLink: '', registrationDeadline: '', maxTeams: '',
      prizes: '', contactEmail: '', contactPhone: ''
    });
  }}
  competition={newCompetition}
  setCompetition={setNewCompetition}
  isEditing={!!editingCompetition}
/>

      <Container className="py-4">
        {currentView === 'competitions' && (
          <>
            <Row className="mb-4">
              <Col>
                <h2 className="h4">All Competitions</h2>
                <p className="text-muted">Find and register for theatre events</p>
              </Col>
              <Col className="text-end">
                <Button variant="success" onClick={() => setShowModal(true)}>
  + Add Competition
</Button>
              </Col>
            </Row>

            <CompetitionFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />

            <Row className="g-4">
              {filteredCompetitions.length > 0 ? (
                filteredCompetitions.map((comp) => (
                  <Col md={6} xl={4} key={comp.id}>
                    <CompetitionCard
                      competition={comp}
                      isRegistered={isRegistered}
                      onRegister={handleRegister}
                      onUnregister={handleUnregister}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      showActions
                    />
                  </Col>
                ))
              ) : (
                <Col className="text-center py-5">
                  <i className="bi bi-emoji-frown display-4 text-muted"></i>
                  <h5 className="mt-3">No competitions found</h5>
                  <p className="text-muted">Try changing your filters</p>
                </Col>
              )}
            </Row>
          </>
        )}

        {currentView === 'calendar' && (
  <>
    <h4>My Calendar</h4>
    <p className="text-muted">Track your registered competitions</p>
    <CompetitionCalendar
  competitions={competitions}
  isRegistered={isRegistered}
  view={calendarView}
  date={calendarDate}
  onViewChange={setCalendarView}
  onDateChange={setCalendarDate}
/>
  </>
)}
      </Container>
    </div>
  );
};

export default TheaterCircuitApp;
