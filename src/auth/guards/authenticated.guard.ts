import { UserServices, UserServicesType } from "@api/users/users.services";
import { APIResponse } from "@typesDef/api";
import { IUser } from "@typesDef/globals";

const _userServices: UserServicesType = new UserServices();

export const isAuthenticated = async (
  jwtAccess,
  cookie,
): Promise<APIResponse<IUser>> => {
  console.log("/!\\ AUTHENTICATED GUARD /!\\");

  if (!cookie.access_token) {
    console.log("@Error: No access token", cookie);
    return {
      success: false,
      message: "Unauthorized",
      errors: "No access token",
    };
  }

  const jwt = await jwtAccess.verify(cookie!.access_token.value);
  if (!jwt) {
    console.log("@Error: Invalid access token", jwt);
    return {
      success: false,
      message: "Unauthorized",
      errors: "Invalid access token",
    };
  }

  const { userId } = jwt;
  if (!userId) {
    console.log("@Error: Invalid access token", userId);
    return {
      success: false,
      message: "Unauthorized",
      errors: "Invalid access token",
    };
  }
  const user = await _userServices.findById(userId);

  if (!user) {
    console.log("@Error: User not found", user);
    return {
      success: false,
      message: "Unauthorized",
      errors: "User not found",
    };
  }

  return {
    success: true,
    data: user,
  };
};
