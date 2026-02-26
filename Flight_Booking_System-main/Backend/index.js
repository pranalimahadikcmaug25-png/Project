import express from "express";
import customerRoutes from "./src/routes/customerRoutes.js";
import FlightRoute from "./src/routes/FlightRoute.js";
import { connectDb } from "./src/configs/DbConfig.js";
import cors from "cors";
import { adminLogin,registerAdmin } from "./src/controllers/AdminController.js";
import {createBooking,getBookings,updateBooking,deleteBooking,getBookingById} from "./src/controllers/BookingController.js";
import { verifyToken } from "./src/middlewares/verifyToken.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// prefix /api
app.use("/api", customerRoutes);
app.use("/api",FlightRoute)

app.post("/admins", registerAdmin);

app.post("/admins/login",adminLogin);
app.post("/api/bookings", verifyToken, createBooking);          // Create booking
app.get("/api/bookings", verifyToken, getBookings);            // Get all bookings (admin)
app.get("/api/bookings/:id", verifyToken, getBookingById);     // Get booking by ID
app.put("/api/bookings/:id", verifyToken, updateBooking);      // Update booking
app.delete("/api/bookings/:id", verifyToken, deleteBooking);   // Delete booking


app.listen(7900, () => {
    connectDb();
    console.log("Server started on port 7900");
});
