import { Router } from "express";

import {
  addHealthRecord,
  getHealthRecords,
  getLatestHealthRecord,
} from "../controllers/healthRecord.controller";

const router = Router();

router.post("/", addHealthRecord);

router.get("/latest/:childId", getLatestHealthRecord);


router.get("/:childId", getHealthRecords);


export default router;