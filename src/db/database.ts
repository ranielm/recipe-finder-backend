import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Recipe } from '../entity/Recipe';
import { Ingredient } from '../entity/Ingredient';
import { RecipeIngredient } from '../entity/RecipeIngredient';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Recipe, Ingredient, RecipeIngredient],
  synchronize: false,
  migrations: ['src/migration/**/*.ts'],
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
