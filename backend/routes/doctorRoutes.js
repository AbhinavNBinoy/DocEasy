import express from "express";
import { uploadPrescription, getPrescription, upload } from "../controllers/prescriptionController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Upload prescription route
router.post("/upload-prescription", verifyToken, upload.single("prescription"), uploadPrescription);

// Get prescription route
router.get("/prescription/:appointmentId", verifyToken, getPrescription);

export default router; 