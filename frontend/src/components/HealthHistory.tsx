import { useEffect, useState } from "react";
import api from "../services/api";
import type { HealthRecord } from "../types/healthRecord.types";

interface Props {
  childId: string;
}

function HealthHistory({ childId }: Props) {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

    useEffect(() => {
  setShowHistory(false);
  setFromDate("");
  setToDate("");
}, [childId]);



  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full bg-slate-700 text-white rounded-lg py-3 cursor-pointer"
      >
        {showHistory ? "Hide Health History" : "View Health History"}
      </button>

      {showHistory && (
        <div className="mt-5 space-y-4">
          
<div className="grid md:grid-cols-2 gap-4 mb-5">

  <div>
    <label className="block text-sm font-semibold mb-2">
      From Date
    </label>

    <input
      type="date"
      value={fromDate}
       max={toDate || new Date().toISOString().split("T")[0]}
      onChange={(e) => setFromDate(e.target.value)}
      className="border rounded-lg p-2 w-full"
    />
  </div>

  <div>
    <label className="block text-sm font-semibold mb-2">
      To Date
    </label>

    <input
      type="date"
      value={toDate}
      min={fromDate|| undefined}
       max={new Date().toISOString().split("T")[0]}
      onChange={(e) => setToDate(e.target.value)}
      className="border rounded-lg p-2 w-full"
    />
  </div>

</div>

          {records .filter((record) => {
     const recordDate = new Date(record.measurementDate);

  if (fromDate && recordDate < new Date(fromDate)) {
    return false;
  }

  if (toDate) {
    const endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);

    if (recordDate > endDate) {
      return false;
    }
  }

  return true;
  }).map((record) => (
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
          {records.filter((record) => {
            const recordDate = new Date(record.measurementDate);

  if (fromDate && recordDate < new Date(fromDate)) {
    return false;
  }

  if (toDate) {
    const endDate = new Date(toDate);
    endDate.setHours(23,59,59,999);

    if (recordDate > endDate) {
      return false;
    }
  }

  return true;
 
}).length === 0 && (
  <div className="text-center text-gray-500 mt-4">
    No health records found for the selected date.
  </div>
)}
        </div>
      )}
    </div>
  );
}

export default HealthHistory;