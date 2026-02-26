import express from "express";
import { addFlight, getAllFlights, getFlightById, updateFlight, deleteFlight } from "../controllers/FlightController.js";

const router = express.Router();

router.post("/addFlight", addFlight);
router.get("/flights", getAllFlights);
router.get("/flights/:id", getFlightById);
router.put("/flights/:id", updateFlight);
router.delete("/flights/:id", deleteFlight);

export default router;
