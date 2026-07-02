import api from "../services/api";
import type { User } from "../types/user.types";

interface Props {
  user: User;
  onDelete: () => void;
  onEdit: () => void;
}

function UserCard({ user, onDelete, onEdit }: Props) {
  const handleDelete = async () => {
    try {
      await api.delete(`/users/${user._id}`);
      onDelete();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{user.name}</h3>
      <p>{user.email}</p>

      <button onClick={onEdit}>Edit</button>

      <button
        onClick={handleDelete}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </div>
  );
}

export default UserCard;