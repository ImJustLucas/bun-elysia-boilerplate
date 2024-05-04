import { APIResponse } from "@typesDef/api";
import { IUser, SignInUserDto, SignUpUserDto } from "@typesDef/user";
import { createElysia } from "@utils/createElysia";

import {
  CookieOptions,
  jwtAccessSetup,
  jwtRefreshSetup,
} from "./guards/setup.jwt";
import { AuthServices, AuthServicesType } from "./auth.services";

const _authService: AuthServicesType = new AuthServices();

export const auth = createElysia({ prefix: "/auth" })
  .use(jwtAccessSetup)
  .use(jwtRefreshSetup)
  .get("/", () => "This is the auth module!")
  .post(
    "/login",
    async ({
      body: data,
      jwtAccess,
      jwtRefresh,
      cookie,
    }): Promise<APIResponse<IUser>> => {
      const user: IUser = await _authService.validateUser(
        data as SignInUserDto,
      );

      cookie.access_token.set({
        value: await jwtAccess.sign({
          userId: user._id,
        }),
        ...CookieOptions.accessToken,
      });

      cookie.refresh_token.set({
        value: await jwtRefresh.sign({
          userId: user._id,
        }),
        ...CookieOptions.refreshToken,
      });

      return {
        success: true,
        data: user,
      };
    },
  )
  .post(
    "/register",
    async ({
      body,
      jwtAccess,
      jwtRefresh,
      cookie,
    }): Promise<APIResponse<IUser>> => {
      if (!body) throw new Error("Data is required");

      const user: IUser = await _authService.register(body as SignUpUserDto);

      cookie.access_token.set({
        value: await jwtAccess.sign({
          userId: user._id,
        }),
        ...CookieOptions.accessToken,
      });

      cookie.refresh_token.set({
        value: await jwtRefresh.sign({
          userId: user._id,
        }),
        ...CookieOptions.refreshToken,
      });

      return {
        success: true,
        data: user,
      };
    },
  )
  .post("/logout", ({ cookie }): APIResponse => {
    delete cookie.access_token;
    delete cookie.refresh_token;

    console.log("COOKIE: ", cookie);
    return {
      success: true,
      data: null,
    };
  });
