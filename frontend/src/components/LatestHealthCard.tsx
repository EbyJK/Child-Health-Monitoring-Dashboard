import type { HealthRecord } from "../types/healthRecord.types";
import StatCard from "./StatCard";

interface Props {
  record: HealthRecord;
}

function LatestHealthCard({ record }: Props) {
  const bmi = (
    record.weight /
    Math.pow(record.height / 100, 2)
  ).toFixed(1);

  const bmiValue = Number(bmi);

let bmiStatus: "normal" | "high" | "low" = "normal";

let bmiText = "";

if (bmiValue < 18.5) {
  bmiStatus = "low";
  bmiText = `${bmi} (Underweight)`;
} else if (bmiValue < 25) {
  bmiStatus = "normal";
  bmiText = `${bmi} (Normal)`;
} else if (bmiValue < 30) {
  bmiStatus = "high";
  bmiText = `${bmi} (Overweight)`;
} else {
  bmiStatus = "high";
  bmiText = `${bmi} (Obese)`;
}


  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">

      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Latest Health Summary
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">

        <StatCard
          title="Height"
          value={`${record.height} cm`}
        />

        <StatCard
          title="Weight"
          value={`${record.weight} kg`}
        />

        <StatCard
          title="Temperature"
          value={`${record.temperature} °C`}
          status={
            record.temperature > 38
              ? "high"
              : "normal"
          }
        />

        <StatCard
          title="Heart Rate"
          value={`${record.heartRate} bpm`}
          status={
            record.heartRate < 60 ||
            record.heartRate > 120
              ? "high"
              : "normal"
          }
        />

        <StatCard
          title="SpO₂"
          value={`${record.spo2}%`}
          status={
            record.spo2 < 95
              ? "low"
              : "normal"
          }
        />

        <StatCard
          title="BMI"
          value={bmiText}
          status={bmiStatus}
        />

      </div>
    </div>
  );
}

export default LatestHealthCard;