import { User } from '../../entity/User';
import { AppDataSource } from '../database';

const usersSeed = [
  {
    username: 'John Doe',
    email: 'john@example.com',
    password: 'r1DanZwyys',
  },
];

const seedDatabase = async () => {
  try {
    await AppDataSource.initialize();
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(usersSeed);
    console.info('Database seeding successful!');
  } catch (err) {
    console.error('Error occurred during database seeding:', err);
  } finally {
    await AppDataSource.destroy();
  }
};

seedDatabase().catch(console.error);
