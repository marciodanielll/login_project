export interface IUserResponseQuery {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IUserForCreate = Omit<IUserResponseQuery, 'id' | 'createdAt' | 'updatedAt' >;
export interface IUserForLogin {
  email: string;
  password: string;
}
export interface IUserModel {
  createUser(user: IUserForCreate): Promise<number>;
  getUserByEmail(email: string): Promise<IUserResponseQuery>;
}
