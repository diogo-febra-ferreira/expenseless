import sqlite3pkg from "sqlite3";
const sqlite3 = sqlite3pkg.verbose();

/**
 *  Returns an instance of the database
 *
 * @returns {Promise<sqlite3.Database>}
 */
async function getDB() {
    // SQLite DB setup
    return new sqlite3.Database("./database.db", (err) => {
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
             date        DATETIME NOT NULL,
             description TEXT,
             category_id INTEGER,
             FOREIGN KEY (category_id) REFERENCES category (id)
                 ON DELETE SET NULL
                 ON UPDATE CASCADE
         )`
    );
}

export { getDB, setupDB };
