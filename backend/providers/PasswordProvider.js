import argon2 from "@node-rs/argon2";
import dotenv from "dotenv";
dotenv.config();
const { APP_PASSWORD_SECRET } = process.env;

class PasswordProvider {
    /**
     * Returns a hashed password using argon2 algorithm
     * @param {string} pass
     * @returns {string} 
     */
    static async hash(pass) {
        const hashed = await argon2.hash(pass, {
            secret: Buffer.from(APP_PASSWORD_SECRET)
        });
        return hashed;
    }

    /**
     * Returns whether or not the password corresponds to the given hash
     * @param {string} pass 
     * @param {string} hash
     * @returns {boolean}
     */
    static async verify(pass, hash) {
        return (await argon2.verify(hash, pass, {secret: APP_PASSWORD_SECRET}));
    }
}

export default PasswordProvider;