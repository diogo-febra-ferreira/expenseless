// index.js
import express from "express";
import * as databaseHandler from "./app/services/databaseHandler.js";
import categoryRoutes from "./app/routes/category.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files from public folder
app.use(express.static("public"));

// Register routes
app.use("/category", categoryRoutes);

app.get("/", (req, res) => {
    res.send("Hello from Express + SQLite 🚀");
});

const db = await databaseHandler.getDB();
await databaseHandler.setupDB(db);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
