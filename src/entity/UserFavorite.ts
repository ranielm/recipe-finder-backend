import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';
import { Recipe } from './Recipe';

@Entity()
export class UserFavorite {
  @PrimaryColumn()
  userId!: number;

  @PrimaryColumn()
  recipeId!: number;

  @ManyToOne(() => User, (user) => user.favorites)
  user!: User;

  @ManyToOne(() => Recipe, (recipe) => recipe.id)
  recipe!: Recipe;
}
