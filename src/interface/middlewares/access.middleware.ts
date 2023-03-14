import { Request, Response, NextFunction } from 'express';
import { IUserForLogin, IUserForCreate } from 'src/types/user.types';
import AccessValidation from '../validations/access.validation';

export default class AccessMiddleware {
  static signUp(req: Request, res: Response, next: NextFunction): Response | void {
    const { body } = req;

    const {
      firstName, lastName, email, password,
    } = body;

    const user: IUserForCreate = {
      firstName, lastName, email, password,
    };

    const error = AccessValidation.signUp(user);

    if (error) return res.status(400).json({ error });

    return next();
  }

  static signIn(req: Request, res: Response, next: NextFunction): Response | void {
    const { body: { email, password } } = req;

    const user: IUserForLogin = { email, password };

    const error = AccessValidation.signIn(user);

    if (error) return res.status(400).json({ error });

    return next();
  }
}
