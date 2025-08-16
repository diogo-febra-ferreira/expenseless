import express from "express";
import * as databaseHandler from "../services/databaseHandler.js";

const router = express.Router();
const db = await databaseHandler.getDB();

// Example API to add a user
router.get("/", (req, res) => {

    //TODO get html template, and fill it with the categories from the DB

    res.send("Category list: ...");
});

export default router;