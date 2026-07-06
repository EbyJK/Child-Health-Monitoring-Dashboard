import mongoose, { Schema, Document } from "mongoose";

export interface IChild extends Document {
  fullName: string;
  dateOfBirth: Date;
  gender: string;
  guardianName: string;
  contactNumber: string;
}

const childSchema = new Schema<IChild>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    guardianName: {
      type: String,
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IChild>("Child", childSchema);