import { IUser, SignUpUserDto } from "@typesDef/user";
import { createElysia } from "@utils/createElysia";
import { AuthServices, AuthServicesType } from "./auth.services";
import { APIResponse } from "@typesDef/api";

const _authService: AuthServicesType = new AuthServices();

export const auth = createElysia({ prefix: "/auth" })
  .get("/", () => "This is the auth module!")
  .post("/login", () => "login")
  .post("/register", (data: SignUpUserDto) => {
    if (!data) throw new Error("Data is required");

    const user: IUser = _authService.register(data);

    // TODO do cookie stuff here

    return {
      success: true,
      data: user,
    };
  })
  .post("/logout", () => "logout");
