
import type { Child } from "../types/child.types";

interface Props {
  child: Child;
}

function ChildDetails({ child }: Props) {
  const calculateAge = (dob: string) => {
    const birth = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const month = today.getMonth() - birth.getMonth();

    if (
      month < 0 ||
      (month === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">

      <h2 className="text-2xl font-bold text-blue-700 mb-6">
         Child Details
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Full Name</p>
          <p className="font-bold text-lg">{child.fullName}</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Gender</p>
          <p className="font-bold">{child.gender}</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Age</p>
          <p className="font-bold">
            {calculateAge(child.dateOfBirth)} Years
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">Date of Birth</p>
          <p className="font-bold">
            {new Date(child.dateOfBirth).toLocaleDateString()}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">
            Guardian
          </p>
          <p className="font-bold">
            {child.guardianName}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm">
            Contact Number
          </p>
          <p className="font-bold">
            📞 {child.contactNumber}
          </p>
        </div>

      </div>

    </div>
  );
}

export default ChildDetails;