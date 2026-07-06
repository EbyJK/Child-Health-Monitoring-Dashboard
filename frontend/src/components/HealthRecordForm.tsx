import { useState } from "react";
import api from "../services/api";

interface Props {
  childId: string;
  onRecordAdded: () => void;
}

function HealthRecordForm({
  childId,
  onRecordAdded,
}: Props) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [temperature, setTemperature] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [spo2, setSpo2] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await api.post("/health-records", {
        childId,
        height: Number(height),
        weight: Number(weight),
        temperature: Number(temperature),
        heartRate: Number(heartRate),
        spo2: Number(spo2),
        measurementDate: new Date(),
      });

      setHeight("");
      setWeight("");
      setTemperature("");
      setHeartRate("");
      setSpo2("");

      onRecordAdded();
    } catch (error: any) {
      console.error(error.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Health Record</h2>

      <input  style={{
    padding:"8px",
    marginBottom:"10px",
    width:"250px"
}}
        placeholder="Height (cm)"
        value={height}
        onChange={(e) =>
          setHeight(e.target.value)
        }
      />

      <br /><br />

      <input  style={{
    padding:"8px",
    marginBottom:"10px",
    width:"250px"
}}
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) =>
          setWeight(e.target.value)
        }
      />

      <br /><br />

      <input style={{
    padding:"8px",
    marginBottom:"10px",
    width:"250px"
}}
        placeholder="Temperature (°C)"
        value={temperature}
        onChange={(e) =>
          setTemperature(e.target.value)
        }
      />

      <br /><br />

      <input  style={{
    padding:"8px",
    marginBottom:"10px",
    width:"250px"
}}
        placeholder="Heart Rate (bpm)"
        value={heartRate}
        onChange={(e) =>
          setHeartRate(e.target.value)
        }
      />

      <br /><br />

      <input  style={{
    padding:"8px",
    marginBottom:"10px",
    width:"250px"
}}
        placeholder="SpO₂ (%)"
        value={spo2}
        onChange={(e) =>
          setSpo2(e.target.value)
        }
      />

      <br /><br />

      <button style={{
    padding:"8px 15px",
    cursor:"pointer"
        }}   type="submit">
        Save Record
      </button>
    </form>
  );
}

export default HealthRecordForm;