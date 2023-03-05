import seeds from '../seeds';

const exec = async (): Promise<void> => {
  await seeds();
  process.exit();
};

exec();
