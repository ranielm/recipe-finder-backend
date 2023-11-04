import express from 'express';
import { UserController } from '../controllers/userController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post(
  '/recipes/:recipeId/favorite',
  isAuthenticated,
  UserController.addFavorite
);
router.delete(
  '/recipes/:recipeId/favorite',
  isAuthenticated,
  UserController.removeFavorite
);
router.get('/recipes/favorites', isAuthenticated, UserController.listFavorites);

export default router;
