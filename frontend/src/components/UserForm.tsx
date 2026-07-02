import { useState,useEffect } from "react";
import api from "../services/api";
import type { User } from "../types/user.types";

interface Props {
  onUserAdded: () => void;
   selectedUser?: User | null;
  clearSelection?: () => void;
}

function UserForm({ onUserAdded,selectedUser,clearSelection }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
  if (selectedUser) {
    setName(selectedUser.name);
    setEmail(selectedUser.email);
  }else{
    setName("");
    setEmail("");
  }
}, [selectedUser]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (selectedUser) {
      await api.put(`/users/${selectedUser._id}`, {
        name,
        email,
      });

      clearSelection?.();
    } else {
      await api.post("/users", {
        name,
        email,
      });
    }

    setName("");
    setEmail("");

    onUserAdded();
  } catch (error) {
    console.error(error);
  }
};
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">{selectedUser?"Update User": "Add User"}</button>
    </form>
  );
}

export default UserForm;