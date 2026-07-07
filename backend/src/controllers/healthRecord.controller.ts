import { Request, Response } from "express";
import HealthRecord from "../models/healthRecord.model";
import Child from "../models/child.model";



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

    if (
  height === "" ||
  weight === "" ||
  temperature === "" ||
  heartRate === "" ||
  spo2 === "" ||
  height == null ||
  weight == null ||
  temperature == null ||
  heartRate == null ||
  spo2 == null ||
  !measurementDate
) {
  return res.status(400).json({
    message: "All health fields are required.",
  });
}

    // Measurement date cannot be in the future
if (new Date(measurementDate) > new Date()) {
  return res.status(400).json({
    
  });
}

    if (height <= 0 || height >200)
      return res.status(400).json({
        message: "Invalid. Height range(1-200)",
      });

    if (weight <= 0 || weight>200)
      return res.status(400).json({
        message: "Invalid. Weight range(1-200)",
      });

    if (heartRate <= 0 || heartRate >220)
      return res.status(400).json({
        message: "Invalid.HeartRate range(1-220)",
      });

    if (spo2 <= 0 || spo2 > 100)
      return res.status(400).json({
        message: "Invalid.SpO2 must be between 1 and 100",
      });

    if (temperature < 30 || temperature > 45)
      return res.status(400).json({
        message: "Invalid body temperature.Range(30-45)",
      });
      const child = await Child.findById(req.body.childId);

if (!child) {
  return res.status(404).json({
    message: "Child not found.",
  });
}
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