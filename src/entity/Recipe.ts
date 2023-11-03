import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column()
  createdAt!: Date;

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
  recipeIngredients!: RecipeIngredient[];
}
