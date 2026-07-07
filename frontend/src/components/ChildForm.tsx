import { useState,useEffect,useRef } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import type { Child } from "../types/child.types";


interface Props {
  onChildAdded: () => void;
  editingChild:Child | null;
  clearEditing:()=> void;
}

function ChildForm({ onChildAdded,editingChild,clearEditing }: Props) {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("Male");
  const [guardianName, setGuardianName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
  if (editingChild) {
    setFullName(editingChild.fullName);
    setDateOfBirth(
      editingChild.dateOfBirth.split("T")[0]
    );
    setGender(editingChild.gender);
    setGuardianName(editingChild.guardianName);
    setContactNumber(editingChild.contactNumber);
  }
    setTimeout(() => {
  nameInputRef.current?.focus();
}, 300);

}, [editingChild]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingChild) {
  await api.put(`/children/${editingChild._id}`, {
    fullName,
    dateOfBirth,
    gender,
    guardianName,
    contactNumber,
  });

  toast.success("Child updated successfully");

  clearEditing();

}

      else{
      await api.post("/children", {
        fullName,
        dateOfBirth,
        gender,
        guardianName,
        contactNumber,
      });
      toast.success("Child added successfully")


    }
      setFullName("");
      setDateOfBirth("");
      setGender("Male");
      setGuardianName("");
      setContactNumber("");
      onChildAdded();
    } catch (err:any) {
      console.error(err);
      toast.error(err.response?.data?.message||"Failed to add child");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5 text-slate-800">Add Child</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
  Full Name
</label>
        <input ref={nameInputRef} className="w-full border rounded-lg p-3" placeholder="Full Name"
          value={fullName} onChange={(e)=>setFullName(e.target.value.replace(/[^A-Za-z ]/g,""))} />

      <label className="block text-sm font-semibold text-gray-700 mb-1">
  Date of Birth
</label>
        <input className="w-full border rounded-lg p-3" type="date"
          value={dateOfBirth} onChange={(e)=>setDateOfBirth(e.target.value)} />


        <label className="block text-sm font-semibold text-gray-700 mb-1">
  Gender
</label>

        <select className="w-full border rounded-lg p-3"
          value={gender} onChange={(e)=>setGender(e.target.value)}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

      <label className="block text-sm font-semibold text-gray-700 mb-1">
  Guardian Name
</label>


        <input className="w-full border rounded-lg p-3" placeholder="Guardian Name"
          value={guardianName} onChange={(e)=>setGuardianName(e.target.value.replace(/[^A-Za-z ]/g,""))} />

          <label className="block text-sm font-semibold text-gray-700 mb-1">
Contact number
</label>

        <input className="w-full border rounded-lg p-3" placeholder="Contact Number"
          type="tel" maxLength={10} value={contactNumber} onChange={(e)=>{const value=e.target.value.replace(/\D/g,"");setContactNumber(value);}} />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold">
          {editingChild ? "Update Child" : "+ Add Child"}
        </button>
      </form>
    </div>
  );
}

export default ChildForm;
