

import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
interface Props {
  childId: string;
  onRecordAdded: () => void;
}

function HealthRecordForm({ childId, onRecordAdded }: Props) {
  const [height,setHeight]=useState("");
  const [weight,setWeight]=useState("");
  const [temperature,setTemperature]=useState("");
  const [heartRate,setHeartRate]=useState("");
  const [spo2,setSpo2]=useState("");

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
      await api.post("/health-records",{
        childId,
        height:Number(height),
        weight:Number(weight),
        temperature:Number(temperature),
        heartRate:Number(heartRate),
        spo2:Number(spo2),
        measurementDate:new Date().toISOString()
      });

      setHeight("");
      setWeight("");
      setTemperature("");
      setHeartRate("");
      setSpo2("");
      toast.success("Health record saved");
      onRecordAdded();
    }catch(err:any){
      console.error(err);
      toast.error(err.response?.data?.message ||"Failed to save health record");
    }
  };

  return(
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5 text-slate-800">
        Add Health Record
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <input className="border rounded-lg p-3" placeholder="Height (cm)"
          value={height} onChange={(e)=>setHeight(e.target.value)} />

        <input className="border rounded-lg p-3" placeholder="Weight (kg)"
          value={weight} onChange={(e)=>setWeight(e.target.value)} />

        <input className="border rounded-lg p-3" placeholder="Temperature (°C)"
          value={temperature} onChange={(e)=>setTemperature(e.target.value)} />

        <input className="border rounded-lg p-3" placeholder="Heart Rate (bpm)"
          value={heartRate} onChange={(e)=>setHeartRate(e.target.value)} />

        <input className="border rounded-lg p-3" placeholder="SpO₂ (%)"
          value={spo2} onChange={(e)=>setSpo2(e.target.value)} />

        <div className="md:col-span-2">
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-3 font-semibold">
            Save Health Record
          </button>
        </div>
      </form>
    </div>
  );
}

export default HealthRecordForm;
