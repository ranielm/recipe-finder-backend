import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserFavorite } from './UserFavorite';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => UserFavorite, (userFavorite) => userFavorite.user)
  favorites!: UserFavorite[];
}
