import express from "express";
import path from "path";
import {fileURLToPath} from "url";

const router = express.Router();

// Needed in ESM to resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/html/dashboard.html"));
});

export default router;
