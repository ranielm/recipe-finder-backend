import express from 'express';
import { UserController } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post(
  '/:userId/recipes/:recipeId/favorites',
  isAuthenticated,
  UserController.addFavorite
);

router.delete(
  '/:userId/recipes/:recipeId/favorites',
  isAuthenticated,
  UserController.removeFavorite
);

export default router;
