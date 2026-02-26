import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import { NavigationBar } from "./component/Navigationbar";
import SearchResults from "./component/SearchResults";
import BookingPage from "./component/BookingPage";
import Login from "./component/Login";
import Register from "./component/Register";
import Info from "./component/Info";
import Support from "./component/Support";
import { AuthProvider } from "./authContext.jsx";
import FlightsPage from "./component/FlightsPage.jsx";
import AdminLogin from "./component/AdminLogin.jsx";
import AdminDashboard from "./component/AdminDashboard.jsx";
import MyBookings from "./component/MyBookings.jsx";

import Footer from "./component/Footer";

import "./App.css";
import { Container } from "react-bootstrap";

function App() {
  return (
     <div className="app-container">
     <AuthProvider>
    <Router>
      
      <NavigationBar />
        <div className="content">

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Info" element={<Info />} />
       <Route path="/contact" element={<Support />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      
      </Routes>
      </div>
      <Footer />
    </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
