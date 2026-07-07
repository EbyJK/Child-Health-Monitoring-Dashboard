import { Request, Response } from "express";
import Child from "../models/child.model";



export const createChild = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      guardianName,
      contactNumber,
    } = req.body;

    // Name validation
    if (!fullName || fullName.trim() === "") {
      return res.status(400).json({
        message: "Full name is required.",
      });
    }

    // Only letters and spaces
    if (!/^[A-Za-z ]+$/.test(fullName)) {
      return res.status(400).json({
        message:
          "Full name should contain only letters and spaces.",
      });
    }

    // Future DOB
    if (new Date(dateOfBirth) > new Date()) {
      return res.status(400).json({
        message:
          "Date of birth cannot be in the future.",
      });
    }

    // Contact Number
    if (!/^\d{10}$/.test(contactNumber)) {
      return res.status(400).json({
        message:
          "Contact number must contain exactly 10 digits.",
      });
    }

    const child = await Child.create({
      fullName,
      dateOfBirth,
      gender,
      guardianName,
      contactNumber,
    });

    res.status(201).json(child);

  } catch (error) {
    res.status(500).json({
      message: "Failed to create child",
    });
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
    const {
      fullName,
      dateOfBirth,
      contactNumber,
    } = req.body;

    // Full Name validation
    if (!fullName || fullName.trim() === "") {
      return res.status(400).json({
        message: "Full name is required.",
      });
    }

    if (!/^[A-Za-z ]+$/.test(fullName)) {
      return res.status(400).json({
        message:
          "Full name should contain only letters and spaces.",
      });
    }

    // Future DOB validation
    if (new Date(dateOfBirth) > new Date()) {
      return res.status(400).json({
        message:
          "Date of birth cannot be in the future.",
      });
    }

    // Contact Number validation
    if (!/^\d{10}$/.test(contactNumber)) {
      return res.status(400).json({
        message:
          "Contact number must contain exactly 10 digits.",
      });
    }
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