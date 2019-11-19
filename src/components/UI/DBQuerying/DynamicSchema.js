var mongoose = require("mongoose");

export const createSchema = (table, attributes) => {
    const obj = {};
    for (const key of attributes) {
         obj[key] = String;
    }
    var schema = new mongoose.Schema(obj);
    return mongoose.model(table, schema);

}