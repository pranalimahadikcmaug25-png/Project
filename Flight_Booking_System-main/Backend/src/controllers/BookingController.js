import { getConnectionObject } from "../configs/DbConfig.js";

// CREATE BOOKING
export async function createBooking(req, res) {
    try {
        const connection = getConnectionObject();
        const data = req.body;

        // Validate required fields
        const requiredFields = ["Customer_id", "F_id", "Booking_date", "Seat_No", "Seat_category"];
        for (let field of requiredFields) {
            if (!data[field]) {
                return res.status(400).json({ message: `${field} is required` });
            }
        }

        const qry = `
            INSERT INTO Booking 
            (Customer_id, F_id, Booking_date, Seat_No, Seat_category, Status, PassengerName, PassengerAge, Phone)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.Customer_id,
            data.F_id,
            data.Booking_date,
            data.Seat_No,
            data.Seat_category,
            data.Status || "Successfull",
            data.PassengerName || null,
            data.PassengerAge || null,
            data.Phone || null
        ];

        const [result] = await connection.query(qry, values);

        if (result.affectedRows === 1) {
            res.status(200).json({ 
                message: "Booking created successfully", 
                bookingId: result.insertId 
            });
        } else {
            res.status(500).json({ message: "Booking creation failed" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

// GET ALL BOOKINGS (Admin only)
export async function getBookings(req, res) {
    try {
        if (req.role !== 'admin') {
            return res.status(403).json({ message: "Only admin can view all bookings" });
        }

        const connection = getConnectionObject();
        const [rows] = await connection.query("SELECT * FROM Booking");
        res.status(200).json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// GET BOOKING BY ID
export async function getBookingById(req, res) {
    try {
        const connection = getConnectionObject();
        const bookingId = req.params.id;

        const [rows] = await connection.query("SELECT * FROM Booking WHERE Booking_id = ?", [bookingId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const booking = rows[0];

        if (req.role !== 'admin' && booking.Customer_id !== req.userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        res.status(200).json(booking);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// UPDATE BOOKING
export async function updateBooking(req, res) {
    try {
        const connection = getConnectionObject();
        const bookingId = req.params.id;
        const data = req.body;

        const [rows] = await connection.query("SELECT * FROM Booking WHERE Booking_id = ?", [bookingId]);
        if (rows.length === 0) return res.status(404).json({ message: "Booking not found" });

        const booking = rows[0];
        if (req.role !== 'admin' && booking.Customer_id !== req.userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        const [result] = await connection.query(
            `UPDATE Booking 
             SET Seat_No = ?, Seat_category = ?, Status = ?, PassengerName = ?, PassengerAge = ?, Phone = ?
             WHERE Booking_id = ?`,
            [
                data.Seat_No || booking.Seat_No,
                data.Seat_category || booking.Seat_category,
                data.Status || booking.Status,
                data.PassengerName || booking.PassengerName,
                data.PassengerAge || booking.PassengerAge,
                data.Phone || booking.Phone,
                bookingId
            ]
        );

        if (result.affectedRows === 1) {
            res.status(200).json({ message: "Booking updated successfully" });
        } else {
            res.status(500).json({ message: "Booking update failed" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// DELETE BOOKING
export async function deleteBooking(req, res) {
    try {
        const connection = getConnectionObject();
        const bookingId = req.params.id;

        const [rows] = await connection.query("SELECT * FROM Booking WHERE Booking_id = ?", [bookingId]);
        if (rows.length === 0) return res.status(404).json({ message: "Booking not found" });

        const booking = rows[0];
        if (req.role !== 'admin' && booking.Customer_id !== req.userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        const [result] = await connection.query("DELETE FROM Booking WHERE Booking_id = ?", [bookingId]);
        if (result.affectedRows === 1) {
            res.status(200).json({ message: "Booking deleted successfully" });
        } else {
            res.status(500).json({ message: "Booking deletion failed" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
