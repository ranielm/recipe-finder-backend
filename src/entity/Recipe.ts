import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
  recipeIngredients!: RecipeIngredient[];
}
