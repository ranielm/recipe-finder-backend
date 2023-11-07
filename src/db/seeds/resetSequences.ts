import { AppDataSource } from '../database';

const resetSequences = async () => {
  try {
    await AppDataSource.initialize();
    const sequences = await AppDataSource.query(`
      SELECT 'ALTER SEQUENCE ' || sequence_name || ' RESTART WITH 1;' as query
      FROM information_schema.sequences
      WHERE sequence_schema = 'public';
    `);

    for (let seq of sequences) {
      await AppDataSource.query(seq.query);
    }
    console.log('All sequences have been reset to the initial value.');
  } catch (err) {
    console.error('Error occurred during sequence reset:', err);
  } finally {
    await AppDataSource.destroy();
  }
};

resetSequences().catch(console.error);
