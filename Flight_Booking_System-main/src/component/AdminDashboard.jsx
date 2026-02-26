import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFlightData, setEditFlightData] = useState({});

  const [newFlight, setNewFlight] = useState({
    F_Name: "",
    Source: "",
    Destination: "",
    F_Date: "",
    F_Time: "",
    Price: "",
    Total_Seats: "",
  });

  // Fetch all flights
  const fetchFlights = async () => {
    try {
      const res = await axios.get("http://localhost:7900/api/flights");
      setFlights(res.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  //  Add flight
  const handleAddChange = (e) => {
    setNewFlight({ ...newFlight, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7900/api/addFlight", newFlight);
      alert("Flight added successfully!");
      setShowAddModal(false);
      setNewFlight({
        F_Name: "",
        Source: "",
        Destination: "",
        F_Date: "",
        F_Time: "",
        Price: "",
        Total_Seats: "",
      });
      fetchFlights();
    } catch (error) {
      console.error(error);
      alert("Failed to add flight.");
    }
  };

  //  Edit flight
  const handleEdit = (flight) => {
    setEditFlightData(flight);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditFlightData({ ...editFlightData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:7900/api/flights/${editFlightData.F_id}`,
        {
          Price: editFlightData.Price,
          Total_Seats: editFlightData.Total_Seats,
        }
      );
      alert("Flight updated successfully!");
      setShowEditModal(false);
      fetchFlights();
    } catch (error) {
      console.error(error);
      alert("Failed to update flight.");
    }
  };

  // Delete flight
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;
    try {
      await axios.delete(`http://localhost:7900/api/flights/${id}`);
      alert("Flight deleted successfully!");
      fetchFlights();
    } catch (error) {
      console.error(error);
      alert("Failed to delete flight.");
    }
  };

  //  Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <Container className="my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <div>
          <Button variant="success" className="me-2" onClick={() => setShowAddModal(true)}>
            Add Flight
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Flights List */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {flights.length === 0 ? (
          <p>No flights available.</p>
        ) : (
          flights.map((flight) => (
            <Col key={flight.F_id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{flight.F_Name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {flight.Source} → {flight.Destination} ({flight.F_Date})
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Time:</strong> {flight.F_Time} <br />
                    <strong>Price:</strong> ₹{flight.Price} <br />
                    <strong>Total Seats:</strong> {flight.Total_Seats}
                  </Card.Text>
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(flight)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(flight.F_id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Add Flight Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            {["F_Name", "Source", "Destination", "F_Date", "F_Time", "Price", "Total_Seats"].map(
              (field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>{field.replace("_", " ")}</Form.Label>
                  <Form.Control
                    type={
                      field === "Price" || field === "Total_Seats"
                        ? "number"
                        : field.includes("Date")
                        ? "date"
                        : field.includes("Time")
                        ? "time"
                        : "text"
                    }
                    name={field}
                    value={newFlight[field]}
                    onChange={handleAddChange}
                    required
                  />
                </Form.Group>
              )
            )}
            <Button variant="success" type="submit" className="mt-2">
              Add Flight
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Flight Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="Price"
                value={editFlightData.Price || ""}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Total Seats</Form.Label>
              <Form.Control
                type="number"
                name="Total_Seats"
                value={editFlightData.Total_Seats || ""}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Flight
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
