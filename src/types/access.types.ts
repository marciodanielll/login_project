import { IUserForCreate, IUserForLogin } from './user.types';

export interface IAccessService {
  signIn(credentials: IUserForLogin): Promise<string>;
  signUp(userForCreate: IUserForCreate): Promise<string>;
}
