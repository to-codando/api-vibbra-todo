import { Context } from "hono";
import { TinitDB } from "../../db/types";
import { TuserModel } from "../models";

import { userServiceFactory, errorServiceFactory } from "../services";

export const userController = (db: TinitDB) => {
  const userService = userServiceFactory(db);
  const error = errorServiceFactory();

  const getAll = async (context: Context) => {
    const users = db.getModel<TuserModel>("users");
    const data = users.findAll(() => true);
    return context.json(data);
  };

  const getById = async (context: Context) => {
    const userId = context.req.param("id");
    const user = await userService.getUserById(userId);
    return user ? context.json(user) : context.json(error.dataNotFound());
  };

  const create = async (context: Context) => {
    const newUserData = await context.req.json<TuserModel>();
    const userExists = await userService.userExists(newUserData);

    if (userExists) return context.json(error.userExists(), 409);

    const newUser = await userService.createUser(newUserData);
    return context.json(newUser, 201);
  };

  const update = async (context: Context) => {
    const userData = await context.req.json<TuserModel>();
    const user = await userService.updateUser(userData);
    return user ? context.json(user) : context.json(error.actionFiled(), 404);
  };

  const remove = async (context: Context) => {
    const userId = context.req.param("id");
    const user = await userService.removeUser(userId);
    return user ? context.json({ ok: true }) : context.json(error.dataNotFound(), 404);
  };

  return {
    create,
    getAll,
    getById,
    update,
    remove,
  };
};
