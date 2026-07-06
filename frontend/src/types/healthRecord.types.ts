export interface HealthRecord {
  _id: string;
  childId: string;
  height: number;
  weight: number;
  temperature: number;
  heartRate: number;
  spo2: number;
  measurementDate: string;
}