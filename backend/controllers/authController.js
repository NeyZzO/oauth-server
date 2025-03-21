import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import speakeasy from "speakeasy";
import { User, OAuthClient, OAuthToken } from "../models/index.js";
import PasswordProvider from "../providers/PasswordProvider.js";
import chalk from "chalk";

export default class AuthController {
    static isEmail(email) {
        // Email regex.
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return re.test(email);
    }

    static async register(req, res) {
        /// Data validation
        const { email, username, password, confirmPassword } = req.body;
        if (!email || !username || !password) {
            return res
                .status(400)
                .json({
                    message: "All fields are required",
                    type: email
                        ? username
                            ? "password"
                            : "username"
                        : "email",
                });
        }

        if (!AuthController.isEmail(email)) {
            return res
                .status(400)
                .json({ message: "Invalid email format", type: "email" });
        }

        /// Now do the checks on the password
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    message: "Password must be at least 8 characters long",
                    type: "password",
                });
        }

        // Check if password contains at least one number
        if (!/\d/.test(password)) {
            return res
                .status(400)
                .json({
                    message: "Password must contain at least one number",
                    type: "password",
                });
        }

        // Check if password contains at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            return res
                .status(400)
                .json({
                    message:
                        "Password must contain at least one uppercase letter",
                    type: "password",
                });
        }

        // Check if password contains at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            return res
                .status(400)
                .json({
                    message:
                        "Password must contain at least one lowercase letter",
                    type: "password",
                });
        }

        // Check if password contains at least one special character
        if (!/[!@#$%^&*]/.test(password)) {
            return res
                .status(400)
                .json({
                    message:
                        "Password must contain at least one special character",
                    type: "password",
                });
        }

        if (password != confirmPassword) {
            return res
                .status(400)
                .json({
                    message: "Passwords do not match",
                    type: "confirmPassword",
                });
        }

        // Check if username and email are already in use
        const userWithUsername = await User.findOne({ where: { username } });
        if (userWithUsername)
            return res
                .status(400)
                .json({ message: "Username already in use", type: "username" });
        const userWithEmail = await User.findOne({
            where: {
                email,
            },
        });
        if (userWithEmail)
            return res
                .status(400)
                .json({ message: "Email already in use", type: "email" });

        // * All the data is valid, we can now put everything in the database;
        try {
            const hashed = PasswordProvider.hash(password);

            const user = await User.create({
                email,
                username,
                password: hashed,
                isVerified: true,
                twoFactorEnabled: true,
                twoFactorSecret: speakeasy.generateSecret().base32,
            });
            
            // TODO: Create session and store the UUID inside
            
            return res.status(201).json({ message: "Created" });
        } catch (err) {
            console.error(chalk.red(err.message));
            res.return(500).json({ message: "Unknown error" });
        }
    }

    static async login(req, res) {
        res.status(200).json({ message: "Login route" });
    }

    static async verify(req, res) {
        res.status(200).json({ message: "Verify route" });
    }

    static async refresh(req, res) {
        res.status(200).json({ message: "Refresh route" });
    }

    static async loginView(req, res) {
        res.status(200).json({ message: "Login view" });
    }

    static async registerView(req, res) {
        res.status(200).json({ message: "Register view" });
    }
}
