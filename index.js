import express from "express";
import * as databaseHandler from "./app/services/databaseHandler.js";
import path from "path";
import { fileURLToPath } from "url";

// Needed for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import categoryRoutes from "./app/routes/category.js";
import apiCategoryRoutes from "./app/routes/api/category.js";
import apiExpenseRoutes from "./app/routes/api/expense.js";
import dashboardRoutes from "./app/routes/dashboard.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Register routes
app.use("/category", categoryRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/api/category", apiCategoryRoutes);
app.use("/api/expense", apiExpenseRoutes);

//serve bootstrap
app.use(
    "/bootstrap",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist"))
);

// Serve static files from public folder
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.redirect("/dashboard");
});

const db = await databaseHandler.getDB();
await databaseHandler.setupDB(db);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
