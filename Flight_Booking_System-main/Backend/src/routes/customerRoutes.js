import express from "express";
import { registerCustomer, updateCustomer,getAllCustomers,getCustomerById,deleteCustomerById,customerLogin } from "../controllers/CustomerController.js";

const router = express.Router();

router.post("/customer", registerCustomer);
router.put("/customer/:id", updateCustomer);
router.get("/customer", getAllCustomers);
router.get("/customer/:customer_id", getCustomerById);
router.delete("/customer/:customer_id", deleteCustomerById);
router.post("/customer/login",customerLogin);

export default router;
