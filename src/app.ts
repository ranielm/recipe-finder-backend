import dotenv from "dotenv";
import cors, { CorsOptions } from "cors"; 
import express from "express";
import recipeRoutes from "./routes/recipeRoutes";
import { AppDataSource } from "./db/database";

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
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/recipe", recipeRoutes);

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

}).catch((err) => {
  console.error("Error during Data Source initialization:", err);
});
