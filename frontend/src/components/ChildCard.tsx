import type { Child } from "../types/child.types";

interface Props {
  child: Child;
  onView: () => void;
}

function ChildCard({ child, onView }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
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
        </div>
      </div>

      <button
        onClick={onView}
        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
      >
        View Details
      </button>
    </div>
  );
}

export default ChildCard;