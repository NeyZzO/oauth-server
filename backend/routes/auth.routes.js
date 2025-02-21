import {Router} from 'express';
import authController from '../controllers/authController.js';
import protectionMiddleware from '../middlewares/protectionMiddleware.js';

const router = Router();

router.post('/login', protectionMiddleware, authController.login); // The post route that'll return the exchange token.
router.post('/register', protectionMiddleware, authController.register); // This route registers the user in the database and returns 404 if success.
router.post('/verify', authController.verify); // This route exchanges the exchange token for an access token.
router.post('/refresh', authController.refresh); // This route refreshes the access token with a refresh token, need to provide all OAuth consumer info (Secret, clientID and redirect URI).
 
router.get('/login', protectionMiddleware, authController.loginView); // This routes displays the login page.
router.get('/register', protectionMiddleware, authController.registerView); // This routes displays the register page.
// TODO: Create the views using react, Maybe use one view for both login and register ?? or react router ??


export default router;