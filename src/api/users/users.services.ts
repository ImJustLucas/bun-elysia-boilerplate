import { IUser } from "@typesDef/globals";
import UserSchema, { UserDocument } from "./users.schema";
import { Model } from "mongoose";

type UsersSearchParams = {
  [key: string]: string | number | boolean;
};

export class UserServices {
  private readonly _usersSchema: Model<UserDocument>;

  constructor() {
    this._usersSchema = UserSchema;
  }

  async search(params?: UsersSearchParams): Promise<IUser[]> {
    let query = {};
    if (params) {
      query = {
        $or: Object.entries(params).map(([key, value]) => ({ [key]: value })),
      };
    }
    const users: IUser[] = await this._usersSchema.find(query);

    return users;
  }
}

export type UserServicesType = UserServices;
