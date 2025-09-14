import sqlite3pkg from "sqlite3";
import fs from "fs";
import path from "path";
const sqlite3 = sqlite3pkg.verbose();

/**
 *  Returns an instance of the database
 *
 * @returns {Promise<sqlite3.Database>}
 */
async function getDB() {
    // SQLite DB setup
    return new sqlite3.Database("./db/database.db", (err) => {
        if (err) {
            console.error("Error opening database", err);
        }
    });
}

/**
 *  Sets up the DB tables needed for the application
 *
 * @param db
 * @returns {Promise<void>}
 */
async function setupDB(db) {
    db.run(
        `CREATE TABLE IF NOT EXISTS category
         (
             id          INTEGER PRIMARY KEY AUTOINCREMENT,
             name        TEXT NOT NULL,
             description TEXT
         )`
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS expense
         (
             id          INTEGER PRIMARY KEY AUTOINCREMENT,
             value       FLOAT NOT NULL,
             date        DATE NOT NULL,
             description TEXT,
             category_id INTEGER,
             FOREIGN KEY (category_id) REFERENCES category (id)
                 ON DELETE SET NULL
                 ON UPDATE CASCADE
         )`
    );
}

/**
 *  Copies the database and renames the copy to yyyy_mm_dd_database.db
 *
 * @returns {Promise<void>}
 */
async function backupDB() {
    const dbPath = "./db/database.db";
    const backupDir = "./db/backups";

    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    // Format date: yyyy_mm_dd
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0].replace(/-/g, "_");

    const backupFile = path.join(backupDir, `${dateStr}_database.db`);

    return new Promise((resolve, reject) => {
        fs.copyFile(dbPath, backupFile, (err) => {
            if (err) {
                console.error("Error creating database backup:", err);
                reject(err);
            } else {
                console.log(`Database backup created: ${backupFile}`);
                resolve();
            }
        });
    });
}

export { getDB, setupDB, backupDB };
