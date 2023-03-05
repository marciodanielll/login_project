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
