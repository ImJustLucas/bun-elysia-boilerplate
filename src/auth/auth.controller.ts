import { IUser, SignUpUserDto, SignInUserDto } from "@typesDef/user";
import { createElysia } from "@utils/createElysia";
import { AuthServices, AuthServicesType } from "./auth.services";
import { APIResponse } from "@typesDef/api";

const _authService: AuthServicesType = new AuthServices();

export const auth = createElysia({ prefix: "/auth" })
  .get("/", () => "This is the auth module!")
  .post("/login", async ({ body: data }): Promise<APIResponse<IUser>> => {
    const user: IUser = await _authService.validateUser(data as SignInUserDto);
    // TODO do cookie stuff here

    return {
      success: true,
      data: user,
    };
  })
  .post("/register", async ({ body }): Promise<APIResponse<IUser>> => {
    if (!body) throw new Error("Data is required");

    const user: IUser = await _authService.register(body as SignUpUserDto);

    // TODO do cookie stuff here

    return {
      success: true,
      data: user,
    };
  })
  .post("/logout", () => "logout");
