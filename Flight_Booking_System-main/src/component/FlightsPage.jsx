import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Modal, Badge } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FlightsPage({ isAdmin = false }) {
  const [flights, setFlights] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await axios.get("http://localhost:7900/api/flights");
      setFlights(res.data);
    } catch (err) {
      console.log("Error fetching flights:", err);
    }
  };

  const handleBook = (flightId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
    } else {
      navigate(`/booking/${flightId}`);
    }
  };

  const handleEdit = (flightId) => {
    navigate(`/admin/edit-flight/${flightId}`);
  };

  const handleDelete = async (flightId) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;
    try {
      await axios.delete(`http://localhost:7900/api/flights/${flightId}`);
      fetchFlights();
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  // Filter flights based on Source, Destination, and F_Date
  const filteredFlights = flights.filter((f) => {
    return (
      (!source || f.Source?.toLowerCase().includes(source.toLowerCase())) &&
      (!destination || f.Destination?.toLowerCase().includes(destination.toLowerCase())) &&
      (!searchDate || f.F_Date === searchDate)
    );
  });

  return (
    <Container className="my-5">
      {/* Search / Filter Section */}
      <Card className="mb-4 p-3 shadow-sm">
        <Form className="row g-3" onSubmit={(e) => e.preventDefault()}>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Source City"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Destination City"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Button type="button" variant="primary" onClick={fetchFlights}>
              Reset / Search
            </Button>
          </Col>
        </Form>
      </Card>

      {/* Flights List */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <Col key={flight.F_id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    ✈️ {flight.F_Name} <Badge bg="info">ID: {flight.F_id}</Badge>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {flight.Source} → {flight.Destination} ({flight.F_Date})
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Departure Time:</strong> {flight.F_Time}
                    <br />
                    <strong>Seats Available:</strong> {flight.Total_Seats}
                    <br />
                    <strong>Price:</strong> ₹{flight.Price}
                  </Card.Text>

                  {isAdmin ? (
                    <>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEdit(flight.F_id)}
                      >
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(flight.F_id)}>
                        Delete
                      </Button>
                    </>
                  ) : (
                    <Button variant="success" onClick={() => handleBook(flight.F_id)}>
                      Book Now
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center mt-5">No flights found.</p>
        )}
      </Row>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to be logged in to book a flight.
          <div className="mt-3 d-flex justify-content-between">
            <Button variant="primary" onClick={() => navigate("/login")}>
              User Login
            </Button>
            <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
