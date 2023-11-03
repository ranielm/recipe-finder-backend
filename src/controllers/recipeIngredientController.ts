import { Request, Response } from 'express';
import { AppDataSource } from '../db/database';
import { RecipeIngredient } from '../entity/RecipeIngredient';

export const RecipeIngredientController = {
  getAllRecipeIngredient: async (req: Request, res: Response) => {
    const ingredientRepository = AppDataSource.getRepository(RecipeIngredient);
    
    try {
      const ingredients = await ingredientRepository.find();
      res.json(ingredients);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  }
};
