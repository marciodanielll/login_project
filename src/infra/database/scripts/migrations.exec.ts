import migrations from '../migrations';

const exec = async (): Promise<void> => {
  await migrations();
  process.exit();
};

exec();
