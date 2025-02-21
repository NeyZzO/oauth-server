/**
 * @description This middleware protects the following routes from unauthorized access
 * - /auth/login
 * - /auth/register
 * 
 * It checks if the redirect uri is present in the request header and if it is, it checks if it belongs to a known user otherwise
 * it returns a 401 status code.
 */
import { OAuthClient } from '../models/index.js';
import { request } from 'express';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {() => ()} next 
 * @returns 
 */
export default async function protectionMiddleware(req, res, next) {
    const {redirect_uri, client_id} = req.query;
    if (!redirect_uri || !client_id) {
        return res.status(401).json({ error: 'Invalid or missing redirect uri' });
    }

    const client = await OAuthClient.findOne({ where: { redirectUri: redirect_uri, clientId: client_id } });
    if (!client) {
        return res.status(401).json({ error: 'Unauthorized application' });
    }

    next();
}
