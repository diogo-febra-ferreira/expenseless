import express from "express";
import path from "path";
import {fileURLToPath} from "url";

const router = express.Router();

import * as categoryService from "../../services/categoryService.js";

// Needed in ESM to resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
    categoryService.getAllCategories();
    //TODO return all gategories
    res.send("hello world");
});

router.post("/", (req, res) => {
    categoryService.createCategory();
    //TODO create a single category

    res.send("hello world");
});

export default router;
