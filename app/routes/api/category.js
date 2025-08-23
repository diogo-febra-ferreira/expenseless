import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

import * as categoryService from "../../services/categoryService.js";

// Needed in ESM to resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * GET /categories
 * Returns all categories
 */
router.get("/", async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

/**
 * POST /categories
 * Creates a new category
 */
router.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const newCategoryId = await categoryService.createCategory(name, description);
        res.status(201).json({ id: newCategoryId, name, description });
    } catch (err) {
        console.error("Error creating category:", err);
        res.status(500).json({ error: "Failed to create category" });
    }
});

export default router;
