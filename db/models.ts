import { Database } from "json-file-database";
import { TuserModel } from "../src/models";
import { TdbModels } from "./types";

export const models = (db: Database): TdbModels => {
  const users = db<TuserModel>({
    name: "users",
    primaryKey: "email",
  });

  return {
    users,
  };
};
