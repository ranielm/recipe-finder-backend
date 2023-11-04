import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './User';
import { Recipe } from './Recipe';

@Entity()
export class UserFavorite {
  @PrimaryColumn()
  userId!: number;

  @PrimaryColumn()
  recipeId!: number;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @ManyToOne(() => Recipe, (recipe) => recipe.favoritedByUsers)
  @JoinColumn({ name: 'recipeId' })
  recipe!: Recipe;
}
