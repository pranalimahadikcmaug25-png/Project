import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../auth";

export default function SearchResults() {
  const query = new URLSearchParams(useLocation().search);
  
  const source = query.get("source");
  const destination = query.get("destination");
  const date = query.get("date");

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:7900/api/flights?source=${source}&destination=${destination}&date=${date}`)
      .then(res => res.json())
      .then(data => {
        setFlights(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [source, destination, date]);
 const handleBook = (flightId) => {
  if (!isLoggedIn()) {
    navigate("/login", { state: { from: `/booking/${flightId}` } });
    return;
  }
  navigate(`/booking/${flightId}`);
};

 return (
    <div className="search-results-container">
  <div className="container mt-5">
    <h2 className="fw-bold mb-4 text-primary">
      ✈️ Flights from {source} ➜ {destination}
    </h2>
    <p className="text-secondary mb-4">🗓 Date: {date}</p>

    {loading && (
      <div className="alert alert-info mt-4 text-center fw-semibold">
        Loading flights...
      </div>
    )}

    {!loading && flights.length === 0 && (
      <div className="alert alert-warning mt-4 text-center fw-semibold">
        ❌ No flights found!
      </div>
    )}

    {!loading && flights.length > 0 && flights.map((flight) => (
      <div 
        key={flight.F_id} 
        className="card shadow-sm border-0 mb-4"
        style={{ borderRadius: "14px" }}
      >
        <div className="card-body d-flex justify-content-between align-items-center">
          
          <div>
            <h4 className="fw-bold text-dark">{flight.F_Name}</h4>
            <p className="mb-1"><b>From:</b> {flight.Source}</p>
            <p className="mb-1"><b>To:</b> {flight.Destination}</p>
          </div>

          <div>
            <p className="mb-1"><b>Date:</b> {new Date(flight.F_Date).toLocaleDateString()}</p>
            <p className="mb-1"><b>Departure:</b> {flight.F_Time}</p>
          </div>

          <div>
            <h5 className="text-success fw-bold">₹{flight.Price}</h5>
         <button onClick={() => handleBook(flight.F_id)}>Book</button>



          </div>

        </div>
      </div>
    ))}
  </div>
  </div>
);

}
