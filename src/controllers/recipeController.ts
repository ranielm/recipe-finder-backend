import { Request, Response } from 'express';
import { Recipe } from '../entity/Recipe';
import { Ingredient } from '../entity/Ingredient';
import { RecipeIngredient } from '../entity/RecipeIngredient';
import { AppDataSource } from '../db/database';

export const getAllRecipes = async (_req: Request, res: Response) => {
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipes = await recipeRepository.find({ relations: ['recipeIngredients', 'recipeIngredients.ingredient'] });
  res.json(recipes);
};

export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const recipeRepository = AppDataSource.getRepository(Recipe);
  const recipe = await recipeRepository.findOne({
    where: { id: parseInt(id) },
    relations: ['recipeIngredients', 'recipeIngredients.ingredient']
  });
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).send('Recipe not found');
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  const { title, description, ingredients } = req.body;

  await AppDataSource.transaction(async transactionalEntityManager => {
    let recipeIngredients = [];

    for (const ingredient of ingredients) {
      let ingEntity = await transactionalEntityManager.findOneBy(Ingredient, { name: ingredient.name });
      if (!ingEntity) {
        ingEntity = transactionalEntityManager.create(Ingredient, {
          name: ingredient.name,
          description: ingredient.description
        });
        await transactionalEntityManager.save(Ingredient, ingEntity);
      }
      const recipeIngredient = transactionalEntityManager.create(RecipeIngredient, {
        ingredient: ingEntity,
        quantity: ingredient.quantity,
        measurementUnit: ingredient.measurementUnit
      });
      await transactionalEntityManager.save(RecipeIngredient, recipeIngredient);
      recipeIngredients.push(recipeIngredient);
    }

    const recipe = transactionalEntityManager.create(Recipe, { title, description, recipeIngredients });
    await transactionalEntityManager.save(Recipe, recipe);
    res.status(201).json(recipe);
  }).catch(error => {
    console.error('createRecipe - Error:', error);
    res.status(500).send('Internal Server Error');
  });
};


export const updateRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, ingredients } = req.body;

  const recipeRepository = AppDataSource.getRepository(Recipe);
  const ingredientRepository = AppDataSource.getRepository(Ingredient);
  const recipeIngredientRepository = AppDataSource.getRepository(RecipeIngredient);

  let recipe = await recipeRepository.findOne({
    where: { id: parseInt(id) },
    relations: ['recipeIngredients', 'recipeIngredients.ingredient']
  });

  if (!recipe) {
    res.status(404).send('Recipe not found');
    return;
  }

  recipe.title = title;
  recipe.description = description;

  if (recipe.recipeIngredients) {
    for (const recipeIngredient of recipe.recipeIngredients) {
      await recipeIngredientRepository.remove(recipeIngredient);
    }
  }
  recipe.recipeIngredients = [];

  for (const ingredientData of ingredients) {
    let ingredient = await ingredientRepository.findOneBy({ name: ingredientData.name });

    if (!ingredient) {
      ingredient = ingredientRepository.create({ name: ingredientData.name });
      await ingredientRepository.save(ingredient);
    }

    const recipeIngredient = recipeIngredientRepository.create({
      ingredient: ingredient,
      quantity: ingredientData.quantity,
      measurementUnit: ingredientData.measurementUnit
    });
    recipe.recipeIngredients.push(recipeIngredient);
  }

  await recipeRepository.save(recipe);
  res.status(200).json(recipe);
};

export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  await AppDataSource.transaction(async transactionalEntityManager => {
    const recipeRepository = transactionalEntityManager.getRepository(Recipe);
    const recipeIngredientRepository = transactionalEntityManager.getRepository(RecipeIngredient);

    const recipe = await recipeRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['recipeIngredients']
    });

    if (!recipe) {
      res.status(404).send('Recipe not found');
      return;
    }

    if (recipe.recipeIngredients.length > 0) {
      await recipeIngredientRepository.remove(recipe.recipeIngredients);
    }

    await recipeRepository.remove(recipe);
    res.status(204).send();
  }).catch(error => {
    console.error('deleteRecipe - Error:', error);
    res.status(500).send('Internal Server Error');
  });
};

export const searchRecipesByIngredients = async (req: Request, res: Response) => {
  const { ingredients } = req.query;

  if (!ingredients || typeof ingredients !== 'string') {
    res.status(400).send('Ingredients query parameter is required and must be a string.');
    return;
  }

  const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase());

  const recipeRepository = AppDataSource.getRepository(Recipe);

  const recipesWithMatchedIngredients = await recipeRepository
    .createQueryBuilder('recipe')
    .leftJoin('recipe.recipeIngredients', 'recipeIngredient')
    .leftJoin('recipeIngredient.ingredient', 'ingredient')
    .where(
      ingredientList.map((ingredient, index) => 
        `ingredient.name ILIKE :ingredient${index}`
      ).join(' OR '),
      Object.fromEntries(
        ingredientList.map((ingredient, index) => [`ingredient${index}`, `%${ingredient}%`])
      )
    )
    .getMany();

  const fullRecipes = await recipeRepository
    .createQueryBuilder('recipe')
    .leftJoinAndSelect('recipe.recipeIngredients', 'recipeIngredient')
    .leftJoinAndSelect('recipeIngredient.ingredient', 'ingredient')
    .where('recipe.id IN (:...recipeIds)', { recipeIds: recipesWithMatchedIngredients.map(recipe => recipe.id) })
    .getMany();

  res.json(fullRecipes);
};
