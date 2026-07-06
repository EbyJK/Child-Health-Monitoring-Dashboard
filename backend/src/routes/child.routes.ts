import { Router } from "express";

import {
  createChild,
  getChildren,
  getChildById,
  updateChild,
  deleteChild,
} from "../controllers/child.controller";

const router = Router();

router.post("/", createChild);
router.get("/", getChildren);
router.get("/:id", getChildById);
router.put("/:id", updateChild);
router.delete("/:id", deleteChild);

export default router;