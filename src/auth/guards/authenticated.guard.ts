import { UserServices, UserServicesType } from "@api/users/users.services";
import { APIResponse } from "@typesDef/api";
import { IUser } from "@typesDef/globals";
import Elysia, { t, Context } from "elysia";

const _userServices: UserServicesType = new UserServices();

export const isAuthenticated = async (
  Context: any
): Promise<APIResponse<IUser>> => {
  const { set, jwtAccess, cookie } = Context;
  console.log("/!\\ AUTHENTICATED GUARD /!\\");

  if (!cookie!.access_token) {
    set.status = 401;
    return {
      success: false,
      message: "Unauthorized",
      errors: "No access token",
    };
  }

  const jwt = await jwtAccess.verify(cookie!.access_token);
  console.log("haha", jwt);
  if (!jwt) {
    set.status = 401;
    return {
      success: false,
      message: "Unauthorized",
      errors: "Invalid access token",
    };
  }

  const { userId } = jwt;

  if (!userId) {
    set.status = 401;
    return {
      success: false,
      message: "Unauthorized",
      errors: "Invalid access token",
    };
  }
  console.log("hihi");
  const user = await _userServices.findById(userId);

  if (!user) {
    set.status = 401;
    return {
      success: false,
      message: "Unauthorized",
      errors: "User not found",
    };
  }

  const userContext = new Elysia({ name: "user" }).decorate("user", user);
  console.log("user", userContext);

  return {
    success: true,
    data: user,
  };
};
