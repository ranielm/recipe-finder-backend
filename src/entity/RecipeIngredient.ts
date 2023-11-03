import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne } from 'typeorm';
import { Ingredient } from './Ingredient';
import { Recipe } from './Recipe';

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
  @JoinTable()
  recipe!: Recipe;

  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients)
  @JoinTable()
  ingredient!: Ingredient;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  quantity?: number;

  @Column({ nullable: true })
  measurementUnit?: string;
}
