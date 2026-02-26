import { useState } from "react";
import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
 import { FaDollarSign, FaHeadset, FaPlane } from "react-icons/fa";
 import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  
  const cityImages = {
    Mumbai:
      "https://t4.ftcdn.net/jpg/01/46/43/87/360_F_146438747_3XYwVkfnYZuukBZYmDM8xeoqENzyhAqa.jpg",
    Delhi:
      "https://media.istockphoto.com/id/1369987507/photo/red-fort-delhi.jpg?s=612x612&w=0&k=20&c=fo1vWvOCZ8RTYPfUpwickwR20S4nXM9X_4XSGTBl5Ks=",
    Bengaluru:
      "https://media.istockphoto.com/id/1384436830/photo/bangalore-or-bengaluru.jpg?s=612x612&w=0&k=20&c=uu_PzZjD9nlXs-tSAkJW07vudI784jobR6NmAFIV13Y=",
    Chennai:
      "https://s7ap1.scene7.com/is/image/incredibleindia/1-marina-beach-city-hero?qlt=82&ts=1726654999969",
    Goa:
    "https://www.thebluekite.com/ckfinder/userfiles/images/15%20Fun%20Things%20To%20Do%20In%20Palolem%20Beach%2C%20South%20Goa%20-%20Trot_World.jpg",
    Punjab:
    "https://media.istockphoto.com/id/535570117/photo/golden-temple-in-amritsar-punjab-india.jpg?s=612x612&w=0&k=20&c=TAgZK64Qz6YsljOK1rXZrrW1u1YSlb9e_YBEmm2pfBw=",
    kashmir:
    "https://images.unsplash.com/photo-1598091383021-15ddea10925d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000",
     Kullu:
     "https://www.jaigaontourandtravels.com/wp-content/uploads/2024/05/solang-valley.jpg"

   
  };
  const navigate = useNavigate();


  return (
    <div className="homepage">

      {/*  Full Screen Hero Section */}
      <div className="hero-wrapper d-flex flex-column justify-content-center align-items-center text-center">

        <Container fluid className="py-5 px-5">
          <h1 className="hero-title mb-3">Book Your Flight With Ease ✈️</h1>
          <p className="hero-subtext mb-4">
            Fast, secure & affordable booking experience.
          </p>

          {/* Search Box */}
          <div className="search-card shadow-lg p-4 mx-auto">
            <Form>
              <Row className="g-3 align-items-end">
                <Col md={4}>
                  <Form.Label>From</Form.Label>
              <Form.Control
  placeholder="City / Airport"
  value={source}
  onChange={(e) => setSource(e.target.value)}
/>


                </Col>
                <Col md={4}>
                  <Form.Label>To</Form.Label>
                 <Form.Control
  placeholder="City / Airport"
  value={destination}
  onChange={(e) => setDestination(e.target.value)}
/>

                </Col>
                <Col md={2}>
                  <Form.Label>Date</Form.Label>
                 <Form.Control
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>
                </Col>
                <Col md={2}>
                  <Button 
  className="search-btn w-100 py-2"
  onClick={(e) => {
    e.preventDefault();

    if (!source || !destination || !date) {
      alert("Please fill all fields");
      return;
    }

    window.location.href = `/search?source=${source}&destination=${destination}&date=${date}`;
  }}
>
  Search
</Button>



                </Col>
              </Row>
            </Form>
          </div>
        </Container>

      </div>

      {/* Features */}
      <Container className="features-section text-center py-5">
  <h2 className="mb-4 fw-bold">Why Choose Us?</h2>
  <Row>
    <Col md={4}>
      <div className="feature-box shadow-sm">
        <FaDollarSign className="feature-icon" />
        <h4 className="fw-bold mt-3">Best Prices</h4>
        <p>Enjoy competitive prices with no hidden charges.</p>
      </div>
    </Col>

    <Col md={4}>
      <div className="feature-box shadow-sm">
        <FaHeadset className="feature-icon" />
        <h4 className="fw-bold mt-3">24/7 Support</h4>
        <p>Our support team is always ready to assist you.</p>
      </div>
    </Col>

    <Col md={4}>
      <div className="feature-box shadow-sm">
        <FaPlane className="feature-icon" />
        <h4 className="fw-bold mt-3">Easy Booking</h4>
        <p>Book flights quickly and securely in just a few clicks.</p>
      </div>
    </Col>
  </Row>
</Container>

      {/* Popular Destinations */}
      <Container className="pb-5">
        <h2 className="section-title mb-4">Popular Destinations</h2>
        <Row>
          {["Mumbai", "Delhi", "Bengaluru", "Chennai","Goa","Punjab","kashmir","Kullu"].map((city) => (
            <Col md={3} className="mb-4" key={city}>
              <Card className="destination-card shadow-sm">
                <Card.Img
                  src={cityImages[city]}
                  alt={city}
                  className="destination-img"
                />
                <Card.Body className="text-center">
                  <Card.Title>{city}</Card.Title>
                  <Button
                        variant="outline-primary"
                            className="w-100"
                           onClick={() => navigate("/flights")}
                                         >View Flights </Button>
                                           
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    </div>
  );
}
