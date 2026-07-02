import { useEffect, useState } from "react";
import api from "../services/api";

import UserCard from "../components/UserCard";
import UserForm from "../components/UserForm";

import type { User } from "../types/user.types";

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>

      <UserForm
        onUserAdded={fetchUsers}
        selectedUser={selectedUser}
        clearSelection={() => setSelectedUser(null)}
      />

      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          onDelete={fetchUsers}
          onEdit={() => setSelectedUser(user)}
        />
      ))}
    </div>
  );
}

export default Home;