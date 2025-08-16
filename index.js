const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// SQLite DB setup
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Error opening database", err);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )`);
    }
});

// Routes
app.get("/", (req, res) => {
    res.send("Hello from Express + SQLite 🚀");
});

// Example API to add a user
app.post("/users", (req, res) => {
    const { name } = req.body;
    db.run("INSERT INTO users (name) VALUES (?)", [name], function (err) {
        if (err) return res.status(500).send(err.message);
        res.json({ id: this.lastID, name });
    });
});

app.get("/users", (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
