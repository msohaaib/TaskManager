export default function TaskTable({ tasks, onEdit, onDelete }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white shadow rounded border-separate border-spacing-0 sm:border-spacing-2">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 sm:p-3">Task Name</th>
            <th className="text-left p-2 sm:p-3 hidden md:table-cell">
              Description
            </th>
            <th className="text-left p-2 sm:p-3">Due Date</th>
            <th className="text-left p-2 sm:p-3">Priority</th>
            <th className="text-left p-2 sm:p-3">Status</th>
            <th className="text-left p-2 sm:p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.$id} className="border-b hover:bg-gray-50">
              <td className="p-2 sm:p-3">{task.Name}</td>
              <td className="p-2 sm:p-3 hidden md:table-cell">
                {task.Description || "—"}
              </td>
              <td className="p-2 sm:p-3">
                {new Date(task.DueDate).toLocaleDateString()}
              </td>
              <td className="p-2 sm:p-3">
                <span
                  className={`px-2 py-1 rounded font-semibold ${getPriorityColor(
                    task.Priority,
                  )}`}
                >
                  {task.Priority}
                </span>
              </td>
              <td className="p-2 sm:p-3">{task.Status}</td>
              <td className="p-2 sm:p-3 flex gap-1 sm:gap-2 flex-wrap">
                <button
                  onClick={() => onEdit(task)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs sm:text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.$id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs sm:text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
