import { UserServices, UserServicesType } from "@api/users/users.services";
import { IUser, SignUpUserDto } from "@typesDef/user";
import bcrypt from "bcrypt";

export class AuthServices {
  private readonly _userServices: UserServicesType;

  constructor() {
    this._userServices = new UserServices();
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  login() {
    return "login";
  }

  register(data: Readonly<SignUpUserDto>): Promise<IUser | null> {
    const { username, email, password } = data;
    const existingUser = this._userServices.search({ username, email });

    if (existingUser) throw new Error("User already exists");

    return data;
  }

  logout() {
    return "logout";
  }
}

export type AuthServicesType = AuthServices;
