import express from "express";
const router = express.Router();

import * as expenseService from "../../services/expenseService.js";

/**
 * GET /expenses
 * Returns all expenses
 */
router.get("/", async (req, res) => {
    try {
        const expenses = await expenseService.getAllExpenses();
        res.json(expenses);
    } catch (err) {
        console.error("Error fetching expenses:", err);
        res.status(500).json({ error: "Failed to fetch expenses" });
    }
});

/**
 * POST /expenses
 * Creates a new expense
 */
router.post("/", async (req, res) => {
    try {
        const { value, date, description, category_id } = req.body;

        if (!value || !date) {
            return res.status(400).json({ error: "Value and Date are required" });
        }

        const newExpenseId = await expenseService.createExpense(value, date, description, category_id);
        res.status(201).json({
            id: newExpenseId,
            value,
            date,
            description,
            category_id
        });
    } catch (err) {
        console.error("Error creating expense:", err);
        res.status(500).json({ error: "Failed to create expense" });
    }
});

export default router;
