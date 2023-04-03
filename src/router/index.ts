import { Hono } from "hono";
import { userRouter } from "./user";
import { TinitDB } from "../../db/types";

export const routerFactory = (db: TinitDB) => {
  const { user } = userRouter(db);

  return {
    user,
  };
};
