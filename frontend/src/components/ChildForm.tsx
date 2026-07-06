import { useState } from "react";
import api from "../services/api";

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

      onChildAdded();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Child</h2>

      <input style={{
    padding:"8px",
    marginBottom:"10px",
    width:"250px"
}}
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <br /><br />

      <input  style={{
    padding:"8px",
    marginBottom:"10px",
    width:"250px"
}}
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
      />

      <br /><br />

      <select  style={{
    padding:"8px",
    marginBottom:"10px",
    width:"250px"
}}
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <br /><br />

      <input  style={{
    padding:"8px",
    marginBottom:"10px",
    width:"250px"
}}
          type="text"
        placeholder="Guardian Name"
        value={guardianName}
        onChange={(e) => setGuardianName(e.target.value)}
      />

      <br /><br />

      <input  style={{
    padding:"8px",
    marginBottom:"10px",
    width:"250px"
}}
        type="text"
        placeholder="Contact Number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />

      <br /><br />

      <button style={{
    padding:"8px 15px",
    cursor:"pointer"
}} type="submit">
        Add Child
      </button>
    </form>
  );
}

export default ChildForm;