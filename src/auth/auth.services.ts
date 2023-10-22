import { UserServices, UserServicesType } from "@api/users/users.services";
import { IUser, SignUpUserDto, SignInUserDto } from "@typesDef/user";

export class AuthServices {
  private _userService: UserServicesType;

  constructor() {
    this._userService = new UserServices();
  }

  async hashPassword(password: string): Promise<string> {
    return await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 12, // number between 4-31
    });
  }

  async validateUser(data: Readonly<SignInUserDto>): Promise<IUser> {
    const existingUser: IUser[] = await this._userService.search({
      email: data.email,
    });
    if (!existingUser || existingUser.length === 0)
      throw new Error("User with this username does not exist");

    const user: IUser = existingUser[0];

    console.log("test");
    const isPasswordValid: boolean =
      await this._userService.compareEncryptedPassword(user._id, data.password);
    if (!isPasswordValid) throw new Error("Incorrect password");

    return user;
  }

  async register(data: Readonly<SignUpUserDto>): Promise<IUser> {
    const { username, email, password } = data;
    const existingUsers: IUser[] = await this._userService.search({
      username,
      email,
    });

    if (existingUsers && existingUsers.length > 0)
      throw new Error("User already exists");

    console.log(data);
    const newUser: IUser = await this._userService.create(
      username,
      email,
      password
    );

    return newUser;
  }

  // async generateAccessToken(user: IUser) {

  // }

  // async generateRefreshToken(user: IUser): Promise<string> {
  //   return this._refreshTokenService.sign(
  //     {
  //       user: user.id,
  //     },
  //     {
  //       subject: user.id,
  //     }
  //   );
  // }
}

export type AuthServicesType = AuthServices;
