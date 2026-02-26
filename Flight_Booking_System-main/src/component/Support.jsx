import React from "react";
import { Alert, Col, Container, Row, Form, Button } from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./FormStyle.css";

export function Support() {
  return (
    <Container className="mt-5">
      {/* Header */}
      <Row className="justify-content-center mb-4">
        <Col lg={8} className="text-center">
          <h2 className="fw-bold text-primary">Contact Us</h2>
          <p className="text-muted">
            We’d love to hear from you! Fill out the form below and our team will respond as soon as possible.
          </p>
        </Col>
      </Row>

      {/* Form */}
      <Row className="justify-content-center">
        <Col lg={6}>
          <Form className="p-4 shadow-sm rounded bg-light form-style">
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" name="Full Name" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" name="email" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter your phone number" name="phone" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Subject of your query" name="subject" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Type your message here..." name="Message" required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 fw-bold">
              Send Message
            </Button>
          </Form>

          {/* Contact Info */}
          <div className="mt-4 p-3 bg-white shadow-sm rounded text-center">
            <h5 className="mb-3 fw-bold">Other Ways to Reach Us</h5>
            <p><FaPhone className="me-2 text-primary" /> +91 9876543210</p>
            <p><FaEnvelope className="me-2 text-primary" /> support@Skypath.com</p>
            <p><FaMapMarkerAlt className="me-2 text-primary" /> 123 CDAC Kharghar,Mumbai, Maharashtra, India</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Support;
