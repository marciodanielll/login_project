import Joi from 'joi';
import { IUserForCreate, IUserForLogin } from '../../types/user.types';

export default class AccessValidation {
  private static schemaSingUp = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
  });

  private static schemaSingIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
  });

  public static signUp(user: IUserForCreate): string | null {
    const { schemaSingUp } = this;
    const { error } = schemaSingUp.validate(user);
    if (error) return error.details[0].message;
    return null;
  }

  public static signIn(user: IUserForLogin): string | null {
    const { schemaSingIn } = this;
    const { error } = schemaSingIn.validate(user);
    if (error) return error.details[0].message;
    return null;
  }
}
