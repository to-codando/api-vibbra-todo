import { Collection } from "json-file-database";
import { TuserModel } from "../src/models";

export type TdbCollection = Collection<TuserModel> & Object;

export type TdbCollections = {
  users: TdbCollection;
};

export type TdbModels = {
  users: Collection<TuserModel>;
};
export type TcollectionsDB<T> = {
  [key: string]: T[];
};

export type TgetModelDB = {
  <T extends Object>(modelName: string): Collection<T>;
};
export type TinsertDB = {
  <T extends Object>(model: Collection<T>, payload: T): boolean;
};

export type TinitDB = {
  init: () => void;
  getModel: TgetModelDB;
  insert: TinsertDB;
};

export type TcreateDB = {
  <T>(filePath: string): TinitDB;
};
