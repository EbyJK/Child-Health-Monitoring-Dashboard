

interface Props {
  title: string;
  value: string;
  status?: "normal" | "high" | "low";
}

function StatCard({
  title,
  value,
  status = "normal",
}: Props) {

  let textColor = "text-green-600";
  let badge = "🟢 Normal";

  if (status === "high") {
    textColor = "text-red-600";
    badge = "🔴 High";
  }

  if (status === "low") {
    textColor = "text-yellow-600";
    badge = "🟡 Low";
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition">

      <h3 className="text-gray-500">
        {title}
      </h3>

      <p className={`text-xl lg:text-2xl font-bold mt-3 wrap-break-word ${textColor}`}>
        {value}
      </p>

      <p className="mt-2 font-medium">
        {badge}
      </p>

    </div>
  );
}

export default StatCard;