import { Request, Response } from "express";
import HealthRecord from "../models/healthRecord.model";

export const addHealthRecord = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      height,
      weight,
      temperature,
      heartRate,
      spo2,
      measurementDate,
    } = req.body;

    if (height <= 0)
      return res.status(400).json({
        message: "Height must be positive",
      });

    if (weight <= 0)
      return res.status(400).json({
        message: "Weight must be positive",
      });

    if (heartRate <= 0)
      return res.status(400).json({
        message: "Heart rate must be positive",
      });

    if (spo2 < 0 || spo2 > 100)
      return res.status(400).json({
        message: "SpO2 must be between 0 and 100",
      });

    if (temperature < 30 || temperature > 45)
      return res.status(400).json({
        message: "Invalid body temperature",
      });

    const record = await HealthRecord.create(req.body);

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add health record",
    });
  }
};

export const getHealthRecords = async (
  req: Request,
  res: Response
) => {
  try {
    const records = await HealthRecord.find({
      childId: req.params.childId,
    }).sort({
      measurementDate: -1,
    });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch records",
    });
  }
};

export const getLatestHealthRecord = async (
  req: Request,
  res: Response
) => {
  try {
    const record = await HealthRecord.findOne({
      childId: req.params.childId,
    }).sort({
      measurementDate: -1,
    });

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch latest record",
    });
  }
};