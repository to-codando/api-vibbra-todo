import { Collection, connect } from "json-file-database";

import { TcreateDB, TgetModelDB, TinsertDB, TdbModels } from "./types";
import { collections } from "./collections";
import { models } from "./models";
import { uuid } from "./createUniqueId";

import { TuserModel } from "../src/models";

const create: TcreateDB = (filePath) => {
  let db = null;
  let dataModels: TdbModels = { users: [] };

  const init = () => {
    db = connect({ file: filePath, init: collections });
    dataModels = models(db);
  };

  const getModel: TgetModelDB = (modelName) => {
    return dataModels[modelName];
  };

  const insert: TinsertDB = (model, payload) => {
    const id = uuid();
    return model.insert({ ...payload, id });
  };

  return { init, getModel, insert };
};

export { create };
