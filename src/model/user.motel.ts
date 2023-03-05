import { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import getConnection from '../infra/database/connection';
import { IUserResponseQuery, IUserForCreate, IUserModel } from '../types/user.types';

export default class UserModel implements IUserModel {
  private db: Promise<PoolConnection>;

  constructor() {
    this.db = getConnection();
  }

  async createUser(user: IUserForCreate): Promise<number> {
    const db = await this.db;
    const [{ insertId }] = await db.execute<ResultSetHeader>(`
    INSERT INTO
      login.user (first_name, last_name, email, password)
    VALUES
      (?, ?, ?, ?);
    `, [user.firstName, user.lastName, user.email, user.password]);

    db.release();

    return insertId;
  }

  async getUserByEmail(email: string): Promise<IUserResponseQuery> {
    const db = await this.db;
    const [[user]] = await db.execute<RowDataPacket[] & IUserResponseQuery []>(`
      SELECT
        id,
        first_name as firstName,
        last_name as lastName,
        email,
        password,
        created_at as createdAt,
        updated_at as updatedAt
      FROM
        login.user
      WHERE
        email = ?;
`, [email]);

    db.release();
    return user;
  }
}
