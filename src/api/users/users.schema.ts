import {
  IUser,
  Language,
  UserAccountStatusType,
  UserRole,
} from "@typesDef/globals";
import { HydratedDocument, model, Schema } from "mongoose";

const SALT_ROUNDS = 12;

export type UserDocument = HydratedDocument<
  IUser & {
    getEncryptedPassword: (_password: string) => Promise<string>;
    compareEncryptedPassword: (_password: string) => Promise<boolean>;
  }
>;

// ! This is a complex user schema, it's just for example. You can use a simple schema for your project.

const UserIdentitySchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    profilePictureUrl: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 50,
    },
    birthDate: {
      type: Date,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const UserPreferencesSchema = new Schema(
  {
    language: {
      type: String,
      required: true,
      enum: Object.keys(Language),
      default: Language.FR,
    },
    currency: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    notifications: {
      email: {
        newsletter: {
          type: Boolean,
          required: true,
          default: true,
        },
        message: {
          type: Boolean,
          required: true,
          default: true,
        },
      },
      push: {
        message: {
          type: Boolean,
          required: true,
          default: true,
        },
      },
    },
  },
  {
    _id: false,
  },
);

const UserAccountStatusSchema = new Schema(
  {
    type: {
      type: Number,
      enum: Object.values(UserAccountStatusType),
      default: UserAccountStatusType.ACTIVE,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    role: {
      type: Number,
      enum: Object.values(UserRole).filter(
        (value) => typeof value === "number",
      ),
      default: UserRole.USER,
    },
    identity: UserIdentitySchema,
    preferences: UserPreferencesSchema,
    accountStatus: UserAccountStatusSchema,
  },
  {
    timestamps: true,
    toJSON: { transform: transformValue },
    toObject: { transform: transformValue },

    methods: {
      async getEncryptedPassword(password: string) {
        return await Bun.password.hash(password, {
          algorithm: "bcrypt",
          cost: SALT_ROUNDS,
        });
      },

      async compareEncryptedPassword(password: string) {
        return await Bun.password.verify(password, this.password);
      },
    },
  },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformValue(_: unknown, ret: { [key: string]: any }) {
  delete ret.password;
  delete ret.__v;
}

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await (this as UserDocument).getEncryptedPassword(
      this.password,
    );
  }

  next();
});

UserSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

export default model<UserDocument>("user", UserSchema);
