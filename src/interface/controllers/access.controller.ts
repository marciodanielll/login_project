import { IUserForLogin, IUserForCreate } from 'src/types/user.types';
import { Response, Request, NextFunction } from 'express';
import UserService from '../../core/services/access.service';
import CustomError from '../../helpers/custom.error.helper';

export default class AccessController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const credentials: IUserForLogin = { email, password };

      const token = await this.userService.signIn(credentials);

      res.status(200).json({ token });
    } catch (err) {
      if (err instanceof Error) {
        next(CustomError.create(err.message, 400));
      } else {
        next(err);
      }
    }
  }

  public async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        firstName, lastName, email, password,
      } = req.body;

      const userForCreate: IUserForCreate = {
        email, password, firstName, lastName,
      };

      const token = await this.userService.signUp(userForCreate);

      res.status(201).json({ token });
    } catch (err) {
      if (err instanceof Error) {
        next(CustomError.create(err.message, 400));
      } else {
        next(err);
      }
    }
  }
}
