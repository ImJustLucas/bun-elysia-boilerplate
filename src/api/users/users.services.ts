import { IUser, UserAccountStatusType } from "@typesDef/globals";
import { Model } from "mongoose";

import UserSchema, { UserDocument } from "./users.schema";

type UsersSearchParams = {
  [key: string]: string | number | boolean;
};

export class UserServices {
  private readonly _userModel: Model<UserDocument>;

  constructor() {
    this._userModel = UserSchema;
  }

  async search(params?: UsersSearchParams): Promise<IUser[]> {
    let query = {};
    if (params) {
      query = {
        $or: Object.entries(params).map(([key, value]) => ({ [key]: value })),
      };
    }
    const users: IUser[] = await this._userModel.find(query);

    return users;
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this._userModel.findById(id).exec();
  }

  async updateOne(id: string, data: Partial<IUser>): Promise<UserDocument> {
    const user = await this._userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!user) throw new Error("User not found");

    return user;
  }

  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<UserDocument> {
    const user: UserDocument = await this._userModel.create({
      username,
      email,
      password,
      role: 1,
    });

    return user;
  }

  async compareEncryptedPassword(
    userId: string,
    password: string,
  ): Promise<boolean> {
    const user = await this._userModel.findById(userId);
    if (!user) throw new Error("User not found");
    console.log("user", user);

    return await user.compareEncryptedPassword(password);
  }

  async deactivate(id: string, reason?: string): Promise<IUser> {
    const since = new Date();

    const user = await this._userModel.findByIdAndUpdate(id, {
      accountStatus: {
        status: UserAccountStatusType.DEACTIVATED,
        reason: reason || "User requested deactivation",
        since,
      },
    });
    if (!user) throw new Error("User not found");

    return user;
  }

  async suspend(id: string, reason: string): Promise<IUser> {
    const since = new Date();

    const user = await this._userModel.findByIdAndUpdate(id, {
      accountStatus: {
        status: UserAccountStatusType.SUSPENDED,
        reason,
        since,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  }

  async delete(id: string): Promise<IUser> {
    const user = await this._userModel.findByIdAndDelete(id);
    if (!user) throw new Error("User not found");

    return user;
  }
}

export type UserServicesType = UserServices;
