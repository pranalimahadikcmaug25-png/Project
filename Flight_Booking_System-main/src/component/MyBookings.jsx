import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../authContext"; // or wherever you store logged-in user info

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth(); // Assuming your auth context stores the customer ID
  const customerId = user?.id; 

  useEffect(() => {
    if (customerId) {
      fetchBookings();
    }
  }, [customerId]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://localhost:7900/api/bookings/${customerId}`);
      setBookings(res.data || []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  if (!customerId) return <p>Please log in to see your bookings.</p>;

  return (
    <Container className="my-5">
      <h2 className="mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have not made any bookings yet.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {bookings.map((booking) => (
            <Col key={booking.bookingId}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{booking.F_Name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {booking.Source} → {booking.Destination} ({booking.F_Date})
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Time:</strong> {booking.F_Time} <br />
                    <strong>Seats Booked:</strong> {booking.Total_Seats} <br />
                    <strong>Price:</strong> ₹{booking.Price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
