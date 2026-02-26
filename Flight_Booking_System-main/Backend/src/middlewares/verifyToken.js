import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // use lowercase 'headers'
  if (!authHeader) {
    return res.status(401).json({ message: "Token is missing" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const payload = jwt.verify(token, "hello1234"); // secret key
    req.loggedincustomerId = payload.customerId;     // for customer-specific actions
    req.role = payload.role || "customer";           // optional: role from token
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is invalid", error: error.message });
  }
}
