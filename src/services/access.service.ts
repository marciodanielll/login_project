import TokenHelper from 'src/helpers/token.helper';
import CryptoHelper from 'src/helpers/crypto.helper';
import { IUserForCreate } from 'src/types/user.types';
import UserModel from '../model/user.motel';

export default class AccessService {
  private userModel: UserModel;

  private tokenHelper: TokenHelper;

  private cryptoHelper: CryptoHelper;

  constructor() {
    this.userModel = new UserModel();
    this.tokenHelper = new TokenHelper();
    this.cryptoHelper = new CryptoHelper();
  }

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userModel.getUserByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await this.cryptoHelper.compareHash(password, user.password);

    if (!isPasswordValid) throw new Error('Invalid email or password');

    const token = this.tokenHelper.create({ userId: user.id.toString(), email });

    return token;
  }

  async signUp(userForCreate: IUserForCreate): Promise<string> {
    const user = await this.userModel.getUserByEmail(userForCreate.email);
    if (user) throw new Error('Email address is already in use');

    const hashedPassword = await this.cryptoHelper.createHash(userForCreate.password);

    const userId = await this.userModel
      .createUser({ ...userForCreate, password: hashedPassword });

    const token = this.tokenHelper
      .create({ userId: userId.toString(), email: userForCreate.email });

    return token;
  }
}
