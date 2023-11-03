import { Request, Response } from 'express';
import { AppDataSource } from '../db/database';
import { Ingredient } from '../entity/Ingredient';

export const IngredientController = {
  addIngredient: async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const ingredientRepository = AppDataSource.getRepository(Ingredient);

    try {
      let ingredient = ingredientRepository.create({ name, description });
      ingredient = await ingredientRepository.save(ingredient);
      res.status(201).json(ingredient);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  },

  getAllIngredients: async (req: Request, res: Response) => {
    const ingredientRepository = AppDataSource.getRepository(Ingredient);

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
  },

  getIngredientById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const ingredientRepository = AppDataSource.getRepository(Ingredient);

    try {
      const ingredient = await ingredientRepository.findOneBy({
        id: parseInt(id),
      });
      if (ingredient) {
        res.json(ingredient);
      } else {
        res.status(404).send('Ingredient not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  },

  updateIngredient: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const ingredientRepository = AppDataSource.getRepository(Ingredient);

    try {
      let ingredient = await ingredientRepository.findOneBy({
        id: parseInt(id),
      });
      if (ingredient) {
        ingredient.name = name;
        ingredient.description = description;
        await ingredientRepository.save(ingredient);
        res.json(ingredient);
      } else {
        res.status(404).send('Ingredient not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  },

  deleteIngredient: async (req: Request, res: Response) => {
    const { id } = req.params;
    const ingredientRepository = AppDataSource.getRepository(Ingredient);

    try {
      const result = await ingredientRepository.delete({ id: parseInt(id) });
      if (result.affected) {
        res.status(200).send(`Ingredient with id ${id} was deleted.`);
      } else {
        res.status(404).send('Ingredient not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  },
};
