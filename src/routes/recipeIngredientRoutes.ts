import express from 'express';
import { RecipeIngredientController } from '../controllers/recipeIngredientController';

const router = express.Router();

router.get('/', RecipeIngredientController.getAllRecipeIngredient);

export default router;
