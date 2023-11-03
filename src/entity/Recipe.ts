import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column('text')
  cookingInstructions!: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column('boolean', { default: false })
  favorited!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe
  )
  recipeIngredients!: RecipeIngredient[];
}
