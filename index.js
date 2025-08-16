// index.js
import express from "express";
import * as databaseHandler from "./app/services/databaseHandler.js";
import categoriesRoutes from "./app/routes/categories.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Register routes
app.use("/categories", categoriesRoutes);

app.get("/", (req, res) => {
    res.send("Hello from Express + SQLite 🚀");
});

const db = await databaseHandler.getDB();
await databaseHandler.setupDB(db);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
