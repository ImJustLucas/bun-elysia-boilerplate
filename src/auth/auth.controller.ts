import { cookie } from "@elysiajs/cookie";

import { IUser, SignUpUserDto, SignInUserDto } from "@typesDef/user";
import { createElysia } from "@utils/createElysia";
import { APIResponse } from "@typesDef/api";

import { AuthServices, AuthServicesType } from "./auth.services";
import {
  CookieOptions,
  jwtAccessSetup,
  jwtRefreshSetup,
} from "./guards/setup.jwt";

const _authService: AuthServicesType = new AuthServices();

export const auth = createElysia({ prefix: "/auth" })
  .use(jwtAccessSetup)
  .use(jwtRefreshSetup)
  .use(cookie())
  .get("/", () => "This is the auth module!")
  .post(
    "/login",
    async ({
      body: data,
      jwtAccess,
      jwtRefresh,
      cookie,
      setCookie,
    }): Promise<APIResponse<IUser>> => {
      const user: IUser = await _authService.validateUser(
        data as SignInUserDto
      );

      setCookie(
        "access_token",
        await jwtAccess.sign({
          userId: user._id,
        }), // @ts-ignore
        CookieOptions.accessToken
      );
      setCookie(
        "refresh_token",
        await jwtRefresh.sign({
          userId: user._id,
        }), // @ts-ignore
        CookieOptions.refreshToken
      );

      console.log("COOKIE: ", cookie);

      return {
        success: true,
        data: user,
      };
    }
  )
  .post(
    "/register",
    async ({
      body,
      jwtAccess,
      jwtRefresh,
      setCookie,
    }): Promise<APIResponse<IUser>> => {
      if (!body) throw new Error("Data is required");

      const user: IUser = await _authService.register(body as SignUpUserDto);

      setCookie(
        "access_token",
        await jwtAccess.sign({
          userId: user._id,
        }), // @ts-ignore
        CookieOptions.accessToken
      );
      setCookie(
        "refresh_token",
        await jwtRefresh.sign({
          userId: user._id,
        }), // @ts-ignore
        CookieOptions.refreshToken
      );

      return {
        success: true,
        data: user,
      };
    }
  )
  .post("/logout", ({ removeCookie, cookie }): APIResponse => {
    removeCookie("access_token");
    removeCookie("refresh_token");

    console.log("COOKIE: ", cookie);
    return {
      success: true,
      data: null,
    };
  });
