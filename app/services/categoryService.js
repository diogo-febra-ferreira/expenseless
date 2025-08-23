import * as databaseHandler from "./databaseHandler.js";
const db = await databaseHandler.getDB();

/**
 *  Returns all categories
 *
 * @returns {Promise<Array>}
 */
async function getAllCategories() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM category", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

/**
 *  Create a category
 *
 * @param {string} name
 * @param {string} [description]
 * @returns {Promise<number>} the inserted category's ID
 */
async function createCategory(name, description = null) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO category (name, description) VALUES (?, ?)`;
        db.run(query, [name, description], function (err) {
            if (err) {
                reject(err);
            } else {
                // "this" is the statement context -> lastID gives the inserted row id
                resolve(this.lastID);
            }
        });
    });
}

export { createCategory, getAllCategories };
