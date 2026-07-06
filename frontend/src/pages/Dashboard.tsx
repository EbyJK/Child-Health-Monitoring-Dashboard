import { useEffect, useState } from "react";
import api from "../services/api";

import type { Child } from "../types/child.types";
import type { HealthRecord } from "../types/healthRecord.types";
import ChildForm from "../components/ChildForm";
import HealthRecordForm from "../components/HealthRecordForm";

function Dashboard() {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [latestRecord, setLatestRecord] = useState<HealthRecord | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const response = await api.get("/children");
      setChildren(response.data);
    } catch (error) {
      console.error(error);
    }finally{
        setLoading(false);
    }
  };

  const fetchLatestRecord = async (childId: string) => {
    try {
      const response = await api.get(`/health-records/latest/${childId}`);
      setLatestRecord(response.data);
    } catch (error) {
      console.error(error);
      setLatestRecord(null);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Children Health Monitoring Dashboard</h1>
        <ChildForm onChildAdded={fetchChildren} />

        <hr />
      <hr />

      <h2>Children</h2>
        {loading && <p>Loading children...</p>}
        {!loading && children.length === 0 && (
            <p>No children found.</p>
        )}

      {children.map((child) => (
        <div
          key={child._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{child.fullName}</h3>

          <p>{child.gender}</p>

          <button style={{
    padding:"8px 15px",
    cursor:"pointer"
}}
            onClick={() => {
              setSelectedChild(child);
              fetchLatestRecord(child._id);
            }}
          >
            View
          </button>
        </div>
      ))}

      {selectedChild && (
        <>
          <hr />

          <h2>Child Details</h2>

          <p>
            <strong>Name:</strong> {selectedChild.fullName}
          </p>

          <p>
            <strong>Guardian:</strong> {selectedChild.guardianName}
          </p>

          <p>
            <strong>Phone:</strong> {selectedChild.contactNumber}
          </p>
        </>
      )}

    {selectedChild && (
  <HealthRecordForm
    childId={selectedChild._id}
    onRecordAdded={() =>
      fetchLatestRecord(selectedChild._id)
    }
  />
)}

        {selectedChild && !latestRecord && (
            <p>No health records found.</p>
            )}

      {latestRecord && (
        <>
          <hr />

          <h2>Latest Health Record</h2>

          <p>Height : {latestRecord.height} cm</p>

          <p>Weight : {latestRecord.weight} kg</p>

            <p
            style={{
                color:
                latestRecord.temperature > 38
                    ? "red"
                    : "green",
                fontWeight: "bold",
            }}
            >
            Temperature : {latestRecord.temperature} °C
            </p>

                <p
                style={{
                    color:
                    latestRecord.heartRate < 60 ||
                    latestRecord.heartRate > 120
                        ? "red"
                        : "green",
                    fontWeight: "bold",
                }}
                >
                Heart Rate : {latestRecord.heartRate} bpm
                </p>

                <p
                style={{
                    color:
                    latestRecord.spo2 < 95
                        ? "red"
                        : "green",
                    fontWeight: "bold",
                }}
                >
                SpO₂ : {latestRecord.spo2}%
                </p>



        </>
      )}
    </div>
  );
}

export default Dashboard;