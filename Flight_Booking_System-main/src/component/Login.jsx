import React, { useState } from "react";
import { Alert, Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { saveToken } from "../auth";
import "./FormStyle.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    PhoneNo: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:7900/api/customer/login",
        formData
      );

      if (response.data.token) {
        saveToken(response.data.token);
        setSuccess("Login successful!");
        navigate(location.state?.from || "/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please check your credentials.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={5}>
          <div className="p-4 shadow-sm rounded bg-light login-card">
            <h2 className="text-center text-primary mb-3 fw-bold">
              Welcome Back
            </h2>
            <p className="text-center text-muted mb-4">
              Please login to continue to your dashboard
            </p>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="PhoneNo"
                  value={formData.PhoneNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 fw-bold"
              >
                Login
              </Button>
            </Form>

            <p className="text-center mt-3 text-muted">
              Don't have an account?{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
