import { TinitDB } from "../../../db/types";
import { TuserModel } from "../../models";
import { TuserReturn, TuserArrayReturn } from "./types";
import { errorServiceFactory } from "../error";
import { Terror } from "../error/types";

const userServiceFactory = (db: TinitDB) => {
  const userModel = db.getModel<TuserModel>("users");
  const error = errorServiceFactory();

  const getAllUsers = async (): Promise<TuserArrayReturn> => {
    return userModel.findAll(() => true) || [];
  };

  const getUserByEmail = async ({ email }: TuserModel): Promise<TuserReturn> => {
    const user = userModel.find({ email });
    return user || null;
  };

  const getUserById = async (id: string): Promise<TuserReturn> => {
    const user = userModel.findAll((user) => user.id === id);
    return Array.from(user).pop() || null;
  };

  const createUser = async (newUserData: TuserModel): Promise<TuserReturn> => {
    const created = db.insert(userModel, newUserData);
    return !created ? null : await getUserByEmail(newUserData);
  };

  const updateUser = async (userTarget: TuserModel): Promise<TuserReturn> => {
    const updated = userModel.update(userTarget);
    return !updated ? null : await getUserByEmail(userTarget);
  };

  const removeUser = async (userId: string): Promise<boolean> => {
    const removed = userModel.removeAll((user) => user.id === userId);
    return !removed ? false : true;
  };

  const userExists = async (newUserData: TuserModel): Promise<boolean> => {
    const user = await getUserByEmail(newUserData);
    return user ? true : false;
  };

  return {
    getAllUsers,
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    removeUser,
    userExists,
  };
};

export { userServiceFactory };
