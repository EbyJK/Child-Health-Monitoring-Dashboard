import { Request, Response } from "express";
import Child from "../models/child.model";

export const createChild = async (req: Request, res: Response) => {
  try {
    const child = await Child.create(req.body);
    res.status(201).json(child);
  } catch (error) {
    res.status(500).json({ message: "Failed to create child" });
  }
};

export const getChildren = async (_req: Request, res: Response) => {
  try {
    const children = await Child.find();
    res.status(200).json(children);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch children" });
  }
};

export const getChildById = async (req: Request, res: Response) => {
  try {
    const child = await Child.findById(req.params.id);

    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    res.status(200).json(child);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch child" });
  }
};

export const updateChild = async (req: Request, res: Response) => {
  try {
    const child = await Child.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    res.status(200).json(child);
  } catch (error) {
    res.status(500).json({ message: "Failed to update child" });
  }
};

export const deleteChild = async (req: Request, res: Response) => {
  try {
    const child = await Child.findByIdAndDelete(req.params.id);

    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    res.status(200).json({
      message: "Child deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete child" });
  }
};