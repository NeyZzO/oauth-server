import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {User, OAuthClient, OAuthToken} from "../models/index.js";

export default class AuthController {

    static async register(req, res) {
        res.status(200).json({ message: "Register route" });
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