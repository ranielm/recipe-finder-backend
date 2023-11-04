import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import recipeRoutes from './routes/recipeRoutes';
import { AppDataSource } from './db/database';
import ingredientRoutes from './routes/ingredientRoutes';
import recipeIngredientRoutes from './routes/recipeIngredientRoutes';
import { isAuthenticated } from './middlewares/isAuthenticated';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || origin === ALLOWED_ORIGIN) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use('/api/users', userRoutes);

app.use('/api/recipes', isAuthenticated, recipeRoutes);

app.use('/api/ingredients', isAuthenticated, ingredientRoutes);

app.use('/api/recipeIngredient', isAuthenticated, recipeIngredientRoutes);

AppDataSource.initialize()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      'Error during Data Source initialization:',
      isAuthenticated,
      err
    );
  });
