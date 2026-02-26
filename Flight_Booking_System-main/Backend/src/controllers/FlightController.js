import express from "express";
import { getConnectionObject}  from "../configs/DbConfig.js";


export async function addFlight(request, response) {
  try {
    const connection = getConnectionObject();
    const data = request.body;

    const qry = `
      INSERT INTO Flight 
      (F_id, F_Name, Source, Destination, F_Date, F_Time, Price, Total_Seats)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await connection.query(qry, [
      data.F_id,
      data.F_Name,
      data.Source,
      data.Destination,
      data.F_Date,
      data.F_Time,
      data.Price,
      data.Total_Seats,
    ]);

    if (result.affectedRows === 1) {
      response.status(200).send({ message: "Flight added successfully" });
    } else {
      response.status(500).send({ message: "Failed to add flight" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

//  Get all flights
export async function getAllFlights(request, response) {
  try {
    const connection = getConnectionObject();
    const { source, destination, date } = request.query;

    let query = "SELECT * FROM Flight WHERE 1=1";
    let params = [];

    if (source) {
      query += " AND Source = ?";
      params.push(source);
    }

    if (destination) {
      query += " AND Destination = ?";
      params.push(destination);
    }

    if (date) {
      query += " AND F_Date = ?";
      params.push(date);
    }

    const [rows] = await connection.query(query, params);
    response.status(200).send(rows);
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong", error: error.message });
  }
}


// Get flight by ID
export async function getFlightById(request, response) {
  try {
    const connection = getConnectionObject();
    const { id } = request.params;

    const [rows] = await connection.query(
      "SELECT * FROM Flight WHERE F_id = ?",
      [id]
    );

    if (rows.length === 0) {
      response.status(404).send({ message: "Flight not found" });
    } else {
      response.status(200).send(rows[0]);
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

//  Update flight
export async function updateFlight(request, response) {
  try {
    const connection = getConnectionObject();
    const { id } = request.params;
    const { Price, Total_Seats } = request.body;

    const [result] = await connection.query(
      "UPDATE Flight SET Price = ?, Total_Seats = ? WHERE F_id = ?",
      [Price, Total_Seats, id]
    );

    if (result.affectedRows === 0) {
      response.status(404).send({ message: "Flight not found" });
    } else {
      response.status(200).send({ message: "Flight updated successfully" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

// Delete flight
export async function deleteFlight(request, response) {
  try {
    const connection = getConnectionObject();
    const { id } = request.params;

    const [result] = await connection.query(
      "DELETE FROM Flight WHERE F_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      response.status(404).send({ message: "Flight not found" });
    } else {
      response.status(200).send({ message: "Flight deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
