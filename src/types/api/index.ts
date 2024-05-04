export * from "./api-responses";

interface ÌCookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | "strict" | "lax" | "none" | undefined;
  maxAge: number;
  path: string;
}

export interface ICookiesOptions {
  accessToken: ÌCookieOptions;
  refreshToken: ÌCookieOptions;
}
