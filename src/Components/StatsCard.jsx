export default function StatsCard({ title, value }) {
  return (
    <div className="flex items-center p-4 bg-white rounded shadow">
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
