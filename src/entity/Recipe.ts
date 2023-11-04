import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { RecipeIngredient } from './RecipeIngredient';
import { UserFavorite } from './UserFavorite';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column('text')
  cookingInstructions!: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe,
    {
      cascade: ['insert', 'update'],
    }
  )
  recipeIngredients!: RecipeIngredient[];

  @OneToMany(() => UserFavorite, (userFavorite) => userFavorite.recipe)
  favoritedByUsers!: UserFavorite[];
}
