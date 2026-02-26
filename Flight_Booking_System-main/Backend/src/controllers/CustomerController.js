import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { getConnectionObject } from "../configs/DbConfig.js";


//  Register Customer
export async function registerCustomer(req, res) {
  try {
    const connection = getConnectionObject();
    const data = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const qry = `
      INSERT INTO customer 
      (customer_id, FirstName, LastName, Gender, Age, PhoneNo, Email, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.customer_id,
      data.FirstName,
      data.LastName,
      data.Gender,
      data.Age,
      data.PhoneNo,
      data.Email,
      hashedPassword
    ];

    const [result] = await connection.query(qry, values);

    if (result.affectedRows === 1) {
      res.status(200).send({ message: "Customer Registered Successfully " });
    } else {
      res.status(500).send({ message: "Customer Registration Failed " });
    }

  } catch (error) {
    console.log(error);

    if (error.errno === 1062) {
      res.status(400).send({ message: "Customer Already Exists ❗" });
    } else {
      res.status(400).send({ message: "Error Occurred" });
    }
  }
}


//  Login API
export async function customerLogin(req, res) {
  try {
    const connection = getConnectionObject();
    const { PhoneNo, password } = req.body;

    const qry = `SELECT * FROM customer WHERE PhoneNo = ?`;
    const [rows] = await connection.query(qry, [PhoneNo]);

    if (rows.length === 0) {
      return res.status(400).send({ message: "Login failed, phone not found ❌" });
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid Password " });
    }

    // Generate JWT token
    const token = Jwt.sign(
      { customer_id: user.customer_id },
      "hello1234"
    );

    return res.status(200).send({
      message: "Login Successful ",
      token: token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong " });
  }
}


// Other CRUD Functions (unchanged)
export async function updateCustomer(req, res) {
  try {
    const connection = getConnectionObject();
    const data = req.body;

    const qry = `
      UPDATE customer 
      SET FirstName=?, LastName=?, PhoneNo=?, Email=?
      WHERE customer_id=?`;

    const values = [
      data.FirstName,
      data.LastName,
      data.PhoneNo,
      data.Email,
      req.params.id
    ];

    const [result] = await connection.query(qry, values);

    if (result.affectedRows === 1) {
      res.status(200).send({ message: "Customer Updated " });
    } else {
      res.status(400).send({ message: "Update Failed " });
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error Occurred " });
  }
}


export async function getAllCustomers(req, res) {
  try {
    const connection = getConnectionObject();
    const qry = `SELECT * FROM customer`;
    const [rows] = await connection.query(qry);
    res.status(200).send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error Occurred " });
  }
}


export async function getCustomerById(req, res) {
  try {
    const connection = getConnectionObject();
    const qry = `SELECT * FROM customer WHERE customer_id = ?`;
    const [rows] = await connection.query(qry, [req.params.customer_id]);

    if (rows.length === 0) return res.status(404).send({ message: "Not Found " });
    res.status(200).send(rows[0]);
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error Occurred " });
  }
}


export async function deleteCustomerById(req, res) {
  try {
    const connection = getConnectionObject();
    const qry = `DELETE FROM customer WHERE customer_id = ?`;
    const [result] = await connection.query(qry, [req.params.customer_id]);

    if (result.affectedRows === 1) res.status(200).send({ message: "Customer Deleted " });
    else res.status(404).send({ message: "Not Found " });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error Occurred " });
  }
}
