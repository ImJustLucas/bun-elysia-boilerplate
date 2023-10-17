import { Language, Currency } from "./globals";

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  identity: UserIdentity;
  preferences: UserPreferences;
  accountStatus: UserAccountStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpUserDto {
  username: string;
  email: string;
  password: string;
}

export interface SignInUserDto {
  email: string;
  password: string;
}

export enum UserRole {
  ADMIN = 2,
  USER = 1,
}

export interface UserIdentity {
  firstName: string;
  lastName: string;
  fullName: string;
  profilePictureUrl?: string;
  birthDate: Date;
}

export interface UserPreferences {
  language: Language;
  currency: Currency;
  notifications: {
    email: {
      newsletter: boolean;
      message: boolean;
    };
    push: {
      message: boolean;
    };
  };
}

export interface UserAccountStatus {
  status: string;
  reason?: string;
  since?: Date;
}

export enum UserAccountStatusType {
  ACTIVE = "active",
  DEACTIVATED = "deactivated",
  SUSPENDED = "suspended",
}
