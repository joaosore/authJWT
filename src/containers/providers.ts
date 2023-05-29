import { IDataProvider } from '@providers/DataProvider/IDataProvider';
import { DayjsDateProvider } from '@providers/DataProvider/implementations/DayjsDateProvider';
import { container } from 'tsyringe';

container.registerSingleton<IDataProvider>(
  'DayjsDateProvider',
  DayjsDateProvider,
);

