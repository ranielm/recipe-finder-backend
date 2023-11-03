import dotenv from "dotenv";
import cors, { CorsOptions }  from "cors"; 
import express from "express";
import recipeRoutes from "./routes/recipeRoutes";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN;

const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin) {
      callback(new Error("Origin header missing or undefined"));
      return;
    }

    if (origin === ALLOWED_ORIGIN) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/recipe", recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
