export default function StatsCard({ title, value }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded shadow w-full">
      <div>
        <p className="text-gray-500 text-sm sm:text-base">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
