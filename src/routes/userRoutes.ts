import express from 'express';
import { UserController } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/recipe/:recipeId/favorite', isAuthenticated, UserController.addFavorite);
router.delete('/recipe/:recipeId/favorite', isAuthenticated, UserController.removeFavorite);

export default router;
