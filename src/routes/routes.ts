import { Router } from "express";

import { userRoutes } from "./user_routes";
import { workspaceRoutes } from "./workspace_routes";
import { memberRoutes } from "./member_routes";
import { boardRoutes } from "./board_routes";
import { columnRoutes } from "./columns_routes";
import { cardRoutes } from "./card_routes";
import { devRoutes } from "./dev_routes";

const router = Router();

router.use(
  "/api",
  userRoutes,
  workspaceRoutes,
  memberRoutes,
  boardRoutes,
  columnRoutes,
  cardRoutes,
  devRoutes,
);

export { router };
