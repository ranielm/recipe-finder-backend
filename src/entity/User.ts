import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  BeforeInsert,
} from 'typeorm';
import { UserFavorite } from './UserFavorite';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column()
  username!: string;

  @Index({ unique: true })
  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => UserFavorite, (userFavorite) => userFavorite.user)
  favorites!: UserFavorite[];
}
