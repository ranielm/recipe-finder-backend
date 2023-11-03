import express from 'express';
import { getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe, searchRecipesByIngredients } from '../controllers/recipeController';

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id', getRecipe);
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);
router.get('/search', searchRecipesByIngredients);

export default router;
