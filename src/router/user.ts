import { Hono } from "hono";
import { TinitDB } from "../../db/types";
import { userController } from "../controllers";
import { TuserRouter } from "./types";

const userRouter = (db: TinitDB): TuserRouter => {
  const router = new Hono();
  const controller = userController(db);

  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);

  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);

  return { user: router };
};

export { userRouter };
