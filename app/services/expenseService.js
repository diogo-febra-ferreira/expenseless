import * as databaseHandler from "./databaseHandler.js";

const db = await databaseHandler.getDB();

/**
 *  Returns all expenses
 *
 * @returns {Promise<Array>}
 */
async function getAllExpenses() {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT value, date, e.description as description, name
             FROM expense e
                      JOIN category c ON e.category_id = c.id`
            , (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
    });
}

/**
 *  Create an expense
 *
 * @param {number} value
 * @param {string} date - ISO string (YYYY-MM-DD or full datetime)
 * @param {string} [description]
 * @param {number} [category_id]
 * @returns {Promise<number>} the inserted expense's ID
 */
async function createExpense(value, date, description = null, category_id = null) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO expense (value, date, description, category_id)
                       VALUES (?, ?, ?, ?)`;
        db.run(query, [value, date, description, category_id], function (err) {
            if (err) {
                reject(err);
            } else {
                // "this" refers to statement context -> lastID gives the inserted row id
                resolve(this.lastID);
            }
        });
    });
}

export {createExpense, getAllExpenses};
