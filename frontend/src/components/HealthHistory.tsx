import { useEffect, useState } from "react";
import api from "../services/api";
import type { HealthRecord } from "../types/healthRecord.types";

interface Props {
  childId: string;
}

function HealthHistory({ childId }: Props) {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (!showHistory) return;

    const fetchRecords = async () => {
      try {
        const res = await api.get(`/health-records/${childId}`);
        setRecords(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecords();
  }, [showHistory, childId]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full bg-slate-700 text-white rounded-lg py-3"
      >
        {showHistory ? "Hide History" : "View Health History"}
      </button>

      {showHistory && (
        <div className="mt-5 space-y-4">
          {records.map((record) => (
            <div
              key={record._id}
              className="border rounded-lg p-4 bg-slate-50"
            >
              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  record.measurementDate
                ).toLocaleDateString()}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {new Date(
                  record.measurementDate
                ).toLocaleTimeString()}
              </p>

              <p>Height: {record.height} cm</p>
              <p>Weight: {record.weight} kg</p>
              <p>Temperature: {record.temperature} °C</p>
              <p>Heart Rate: {record.heartRate} bpm</p>
              <p>SpO₂: {record.spo2}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HealthHistory;