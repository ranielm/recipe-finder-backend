import { Request, Response } from 'express';
import { Recipe } from '../entity/Recipe';
import { AppDataSource } from '../db/database';

export const getAllRecipes = async (req: Request, res: Response) => {
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipes = await recipeRepository.find();
  res.json(recipes);
};

export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipe = await recipeRepository.findOneBy({ id: parseInt(id) });
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).send('Recipe not found');
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipe = recipeRepository.create(req.body);
  await recipeRepository.save(recipe);
  res.status(201).json(recipe);
};

export const updateRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const recipeRepository = AppDataSource.getRepository(Recipe);
  let recipe = await recipeRepository.findOneBy({ id: parseInt(id) });
  if (recipe) {
    recipeRepository.merge(recipe, req.body);
    const results = await recipeRepository.save(recipe);
    res.json(results);
  } else {
    res.status(404).send('Recipe not found');
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const deleteResponse = await recipeRepository.delete(id);
  if (deleteResponse.affected) {
    res.status(204).send();
  } else {
    res.status(404).send('Recipe not found');
  }
};
