import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";

export const CookieOptions = {
  accessToken: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // parseInt(process.env.JWT_TOKEN_EXPIRATION_TIME || "7d"),
  },
  refreshToken: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/auth/refresh-token",
    maxAge: 30 * 24 * 60 * 60, //parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || "30d"),
  },
};

export const jwtAccessSetup = new Elysia({
  name: "jwtAccess",
}).use(
  jwt({
    name: "jwtAccess",
    schema: t.Object({
      userId: t.String(),
    }),
    secret: process.env.JWT_ACCESS_SECRET || "DO NOT USE THIS SECRET KEY",
    exp: 30 * 24 * 60 * 60,
  })
);

export const jwtRefreshSetup = new Elysia({
  name: "jwtRefresh",
}).use(
  jwt({
    name: "jwtRefresh",
    schema: t.Object({
      userId: t.String(),
    }),
    secret: process.env.JWT_REFRESH_SECRET || "DO NOT USE THIS SECRET KEY",
    exp: 30 * 24 * 60 * 60,
  })
);

export type jwtAccessSetupType = typeof jwtAccessSetup;
