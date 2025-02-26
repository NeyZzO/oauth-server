import { test } from "@jest/globals";
import { sequelize } from "../models/index.js";

test("Tests the database connection", async (done) => {
    try {
        const result = await sequelize.query("SELECT (1 + 1) AS RESULT;");
    } catch (err) {
        done (err);
    }        
    console.log(result[0]);
    done("Database connection successful");
})