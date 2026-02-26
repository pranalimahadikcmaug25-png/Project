import bcrypt from "bcrypt";
import { connectDb, getConnectionObject } from "./src/configs/DbConfig.js";

async function hashPasswords() {
    await connectDb();
    const connection = getConnectionObject();

    const [rows] = await connection.query("SELECT customer_id, password FROM customer");

    for (let user of rows) {
        // Skip if password is NULL or empty
        if (!user.password || user.password.trim() === "") {
            console.log(`⚠️ Skipping ID ${user.customer_id} — password is empty or NULL`);
            continue;
        }

        // Skip if already hashed
        if (user.password.startsWith("$2b$")) {
            console.log(`Already hashed: ${user.customer_id}`);
            continue;
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        await connection.query(
            "UPDATE customer SET password = ? WHERE customer_id = ?",
            [hashedPassword, user.customer_id]
        );

        console.log(` Hashed password for customer ID: ${user.customer_id}`);
    }

    console.log(" Completed hashing!");
    process.exit();
}

hashPasswords();
