import * as databaseHandler from "./databaseHandler.js";
const db = await databaseHandler.getDB();


/**
 *  Returns all categories
 *
 */
function getAllCategories() {
    //TODO
}


/**
 *  Create a category
 *
 */
function createCategory() {
        //TODO
}


module.exports = {
    createCategory,
    getAllCategories,
};
