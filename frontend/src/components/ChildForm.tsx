


import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
interface Props {
  onChildAdded: () => void;
}

function ChildForm({ onChildAdded }: Props) {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [guardianName, setGuardianName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/children", {
        fullName,
        dateOfBirth,
        gender,
        guardianName,
        contactNumber,
      });

      setFullName("");
      setDateOfBirth("");
      setGender("Male");
      setGuardianName("");
      setContactNumber("");
      toast.success("Child added successfully")
      onChildAdded();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message||"Failed to add child");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5 text-slate-800">Add Child</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border rounded-lg p-3" placeholder="Full Name"
          value={fullName} onChange={(e)=>setFullName(e.target.value.replace(/[^A-Za-z]/g,""))} />

        <input className="w-full border rounded-lg p-3" type="date"
          value={dateOfBirth} onChange={(e)=>setDateOfBirth(e.target.value)} />

        <select className="w-full border rounded-lg p-3"
          value={gender} onChange={(e)=>setGender(e.target.value)}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input className="w-full border rounded-lg p-3" placeholder="Guardian Name"
          value={guardianName} onChange={(e)=>setGuardianName(e.target.value.replace(/[^A-Za-z]/g,""))} />

        <input className="w-full border rounded-lg p-3" placeholder="Contact Number"
          type="tel" maxLength={10} value={contactNumber} onChange={(e)=>{const value=e.target.value.replace(/\D/g,"");setContactNumber(value);}} />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold">
          + Add Child
        </button>
      </form>
    </div>
  );
}

export default ChildForm;
