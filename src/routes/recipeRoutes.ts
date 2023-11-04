import express from 'express';

import { RecipeIController } from '../controllers/recipeController';

const router = express.Router();

router.get('/search', RecipeIController.searchRecipesByIngredients);
router.get('/', RecipeIController.getAllRecipes);
router.get('/:id', RecipeIController.getRecipe);
router.post('/', RecipeIController.createRecipe);
router.put('/:id', RecipeIController.updateRecipe);
router.delete('/:id', RecipeIController.deleteRecipe);

export default router;
