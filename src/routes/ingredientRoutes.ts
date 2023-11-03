import express from 'express';
import { IngredientController } from '../controllers/ingredientController';

const router = express.Router();

router.post('/', IngredientController.addIngredient);
router.get('/', IngredientController.getAllIngredients);
router.get('/:id', IngredientController.getIngredientById);
router.put('/:id', IngredientController.updateIngredient);
router.delete('/:id', IngredientController.deleteIngredient);

export default router;
