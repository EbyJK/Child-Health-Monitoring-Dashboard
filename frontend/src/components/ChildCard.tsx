import api from "../services/api";
import toast from "react-hot-toast";
import type { Child } from "../types/child.types";

interface Props {
  child: Child;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function ChildCard({
  child,
  onView,
  onEdit,
  onDelete,
}: Props) {

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      `Delete ${child.fullName}?`
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/children/${child._id}`);

      toast.success("Child deleted successfully");

      onDelete();

    } catch (err: any) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to delete child"
      );

    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300 border border-gray-100">

      <h2 className="text-xl font-bold text-slate-800">
        👦 {child.fullName}
      </h2>

      <p className="text-gray-600 mt-2">
        Gender : {child.gender}
      </p>

      <p className="text-gray-600">
        Guardian : {child.guardianName}
      </p>

      <p className="text-gray-600">
        📞 {child.contactNumber}
      </p>

      <div className="grid grid-cols-3 gap-2 mt-5">

        <button
          onClick={onView}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          View
        </button>

        <button
          onClick={onEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default ChildCard;