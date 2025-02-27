import {test, describe, expect} from "vitest";
import { sequelize } from "../models/index.js";

test("Tests the database connection", async () => {
    try {
        const result = await sequelize.query("SELECT (1 + 1) AS RESULT;");
        expect(result[0][0].result).toBe(2);
    } catch (err) {
        done (err);
    }        
})