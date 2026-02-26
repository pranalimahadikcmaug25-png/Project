import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

export async function registerAdmin(request, response) {
    try {
        const connection = getConnectionObject();
        const { id, FirstName, LastName, PhoneNo, Email, Password } = request.body;
        const encryptedPassword = hashSync(Password, 12);

        // ✅ Use parameterized query with explicit columns
        const qry = `
            INSERT INTO admin (id, FirstName, LastName, PhoneNo, Email, Password)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [resultSet] = await connection.query(qry, [
            id,
            FirstName,
            LastName,
            PhoneNo,
            Email,
            encryptedPassword
        ]);

        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Admin registered' });
        } else {
            response.status(500).send({ message: 'Admin registration failed' });
        }
    } catch (error) {
        console.log(error);
        if (error.errno === 1062) {
            response.status(400).send({ message: 'Admin with this id already exists' });
        } else {
            response.status(500).send({ message: 'Something went wrong' });
        }
    }
}


export async function adminLogin(request, response) {
    try {
        const connection = getConnectionObject();
        const { phone, password } = request.body;

        const qry = `SELECT * FROM admin WHERE PhoneNo=?`;
        const [rows] = await connection.query(qry, [phone]);

        if (rows.length === 0) {
            return response.status(400).send({ message: "Login failed, phone doesn't exist" });
        }

        const admin = rows[0];
        
        if (!admin.password) {
            return response.status(500).send({ message: "Admin record has no password stored" });
        }
        const isMatch = compareSync(password, admin.password);
        if (!isMatch) {
            return response.status(400).send({ message: "Login failed, password is invalid" });
        }

        const token = jwt.sign({ adminId: admin.id }, 'hello1234');

        response.status(200).send({
            token,
            message: "Login successful"
        });

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: "Something went wrong" });
    }
}
