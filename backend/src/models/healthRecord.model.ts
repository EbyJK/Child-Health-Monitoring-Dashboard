import mongoose, { Schema, Document } from "mongoose";

export interface IHealthRecord extends Document {
  childId: mongoose.Types.ObjectId;
  height: number;
  weight: number;
  temperature: number;
  heartRate: number;
  spo2: number;
  measurementDate: Date;
}

const healthRecordSchema = new Schema<IHealthRecord>(
  {
    childId: {
      type: Schema.Types.ObjectId,
      ref: "Child",
      required: true,
    },

    height: {
      type: Number,
      required: true,
      min: 1,
      max:200,
    },

    weight: {
      type: Number,
      required: true,
      min: 1,
      max:200,
    },

    temperature: {
      type: Number,
      required: true,
      min: 30,
      max: 45,
    },

    heartRate: {
      type: Number,
      required: true,
      min: 1,
      max:220,
    },

    spo2: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    measurementDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IHealthRecord>(
  "HealthRecord",
  healthRecordSchema
);