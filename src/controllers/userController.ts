import { Request, Response } from 'express';
import { AppDataSource } from '../db/database';
import { User } from '../entity/User';
import { Recipe } from '../entity/Recipe';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UserFavorite } from '../entity/UserFavorite';
import { secret } from '../middlewares/isAuthenticated';

export const UserController = {
  register: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);

      const existingUser = await userRepository.findOneBy({ email });
      if (existingUser) {
        return res.status(400).send('User already exists');
      }

      const hashedPassword = await hash(password, 12);

      const newUser = userRepository.create({
        username,
        email,
        password: hashedPassword,
      });

      await userRepository.save(newUser);

      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ email });

      if (!user) {
        return res.status(401).send('Credentials are invalid');
      }

      const isValid = await compare(password, user.password);
      if (!isValid) {
        return res.status(401).send('Credentials are invalid');
      }

      if (!secret) {
        throw new Error('JWT_SECRET is not set');
      }

      const token = sign({ userId: user.id }, secret, {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  },

  addFavorite: async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const recipeId = parseInt(req.params.recipeId);

    try {
      const userFavoriteRepository = AppDataSource.getRepository(UserFavorite);
      const recipeRepository = AppDataSource.getRepository(Recipe);

      const recipe = await recipeRepository.findOneBy({ id: recipeId });
      if (!recipe) {
        return res.status(404).send('Recipe not found');
      }

      const existingFavorite = await userFavoriteRepository.findOneBy({
        userId,
        recipeId,
      });
      if (existingFavorite) {
        return res.status(400).send('Recipe is already a favorite');
      }

      const newFavorite = userFavoriteRepository.create({ userId, recipeId });

      await userFavoriteRepository.save(newFavorite);

      res.status(201).send('Favorite added successfully');
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  },

  removeFavorite: async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);
    const recipeId = parseInt(req.params.recipeId);

    try {
      const userFavoriteRepository = AppDataSource.getRepository(UserFavorite);

      const result = await userFavoriteRepository
        .createQueryBuilder()
        .delete()
        .from(UserFavorite)
        .where('userId = :userId and recipeId = :recipeId', {
          userId,
          recipeId,
        })
        .execute();

      if (result.affected === 0) {
        return res.status(404).send('Favorite not found');
      }

      res.status(200).send('Favorite removed successfully');
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  },
};
