import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";

export default function BookingPage() {
  const { id } = useParams(); // flight id
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    Booking_date: "",
    Seat_No: "",
    Seat_category: "",
    Class:"",
    Passenger_name: "",
    Age: "",
    Phone: "",
    Email: "",
    Meal_Preference: "",
    Special_Assistance: false,
    Travel_Insurance: false,
    Status: "Successfull", // default
    F_id: id,
    Customer_id: localStorage.getItem("customer_id"),
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Fetch flight details
  useEffect(() => {
    fetch(`http://localhost:7900/api/flights/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFlight(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  // Submit booking
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newBooking = { ...booking };

    fetch("http://localhost:7900/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then((data) => {
        setConfirmedBooking({ ...newBooking, Booking_id: data.bookingId });
        setShowModal(true);
        setMessage("");
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Booking failed. Please try again.");
      });
  };

  if (loading)
    return (
      <Container className="text-center mt-5">
        <Alert variant="info">Loading flight details...</Alert>
      </Container>
    );

  if (!flight)
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">Flight not found!</Alert>
      </Container>
    );

  return (
    <Container className="mt-4">
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h4 className="fw-bold text-primary">{flight.F_Name}</h4>
          <p>
            <b>From:</b> {flight.Source} ➜ <b>To:</b> {flight.Destination}
          </p>
          <p>
            <b>Date:</b> {new Date(flight.F_Date).toLocaleDateString()}
          </p>
          <p>
            <b>Departure:</b> {flight.F_Time}
          </p>
          <h5 className="text-success fw-bold">₹{flight.Price}</h5>
        </Card.Body>
      </Card>

      <h4 className="mb-3">Enter Booking Details</h4>
      {message && <Alert>{message}</Alert>}

      <Form onSubmit={handleSubmit}>
      
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Passenger Name</Form.Label>
              <Form.Control
                type="text"
                name="Passenger_name"
                value={booking.Passenger_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="Age"
                value={booking.Age}
                onChange={handleChange}
                min={0}
                
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="Phone"
                value={booking.Phone}
                onChange={handleChange}
                placeholder="eg:+919876543210"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={booking.Email}
                onChange={handleChange}
                placeholder="example@mail.com"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Meal Preference</Form.Label>
              <Form.Select
                name="Meal_Preference"
                value={booking.Meal_Preference}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Vegan">Vegan</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        
        <Row>
          
         
           <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Select
                name="Class"
                value={booking.Class}
                onChange={handleChange}
                required
              >
                <option value="">Select Class</option>
                <option value="first class">first class</option>
                <option value="Economy class">Economy class</option>
                <option value="Business class">Business</option>
                <option value="Premium Economy">Premium Economy</option>
              </Form.Select>
            </Form.Group>
          </Col>

           <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Seat Preference</Form.Label>
              <Form.Select
                name="Seat_category"
                value={booking.Seat_category}
                onChange={handleChange}
                required
              >
                <option value="">Select seat</option>
                <option value="Window">Window</option>
                <option value="Aisle">Aisle</option>
                <option value="Middle">Middle</option>
              </Form.Select>
            </Form.Group>
          </Col>

        </Row>
        
       <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Special Assistance</Form.Label>
              <Form.Check
                type="checkbox"
                name="Special_Assistance"
                checked={booking.Special_Assistance}
                onChange={(e) =>
                  setBooking((prev) => ({
                    ...prev,
                    Special_Assistance: e.target.checked,
                  }))
                }
                label="Need assistance"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Travel Insurance</Form.Label>
              <Form.Check
                type="checkbox"
                name="Travel_Insurance"
                checked={booking.Travel_Insurance}
                onChange={(e) =>
                  setBooking((prev) => ({
                    ...prev,
                    Travel_Insurancee: e.target.checked,
                  }))
                }
                label="Do you want travel Insurance"
              />
            </Form.Group>
          </Col>

        <Button variant="primary" type="submit" className="w-100">
          Confirm Booking
        </Button>
      </Form>

      {/* Modal for booking confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmed ✅</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmedBooking && (
            <div>
              <p>
                <b>Booking ID:</b> {confirmedBooking.Booking_id}
              </p>
              <p>
                <b>Passenger:</b> {confirmedBooking.Passenger_name} (
                {confirmedBooking.Age} years)
              </p>
              <p>
                <b>Phone:</b> {confirmedBooking.Phone}
              </p>
              <p>
                <b>Email:</b> {confirmedBooking.Email || "-"}
              </p>
              <p>
                <b>Class:</b> {confirmedBooking.Class} 
              </p>
              <p>
                <b>Seat:</b> {confirmedBooking.Seat_category} ({confirmedBooking.Seat_No})
              </p>
              <p>
                <b>Meal:</b> {confirmedBooking.Meal_Preference || "-"}
              </p>
              <p>
                <b>Special Assistance:</b>{" "}
                {confirmedBooking.Special_Assistance ? "Yes" : "No"}
              </p>
              <p>
                <p>
                <b>Travel Insurance:</b>{" "}
                {confirmedBooking.Travel_Insurance? "Yes" : "No"}
              </p>
              <p></p>
                <b>Status:</b> {confirmedBooking.Status}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              setShowModal(false);
              navigate("/");
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
