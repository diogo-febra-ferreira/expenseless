import express from "express";
const router = express.Router();

import * as databaseHandler from "../../services/databaseHandler.js";

router.post("/backup-db", async (req, res) => {
    try {
        await databaseHandler.backupDB();
        res.json({
            success: true,
            message: "Database backup created successfully",
        });
    } catch (err) {
        console.error("Error in /backup-db:", err);
        res.status(500).json({
            success: false,
            message: "Failed to create database backup",
            error: err.message,
        });
    }
});

export default router;
