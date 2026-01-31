import React, { useState, useEffect } from "react";

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const priorityOptions = ["High", "Medium", "Low"];
  const statusOptions = ["Pending", "In Progress", "Completed"];

  // Initialize formData based on task (edit) or defaults (add)
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Priority: "Medium",
    Status: "Pending",
    DueDate: "",
  });

  // Update form data when task changes (for editing)
  useEffect(() => {
    if (task) {
      setFormData({
        Name: task.Name || "",
        Description: task.Description || "",
        Priority: task.Priority || "Medium",
        Status: task.Status || "Pending",
        DueDate: task.DueDate ? task.DueDate.split("T")[0] : "", // format YYYY-MM-DD
      });
    } else {
      setFormData({
        Name: "",
        Description: "",
        Priority: "Medium",
        Status: "Pending",
        DueDate: "",
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.Name || !formData.Description || !formData.DueDate) {
      return alert("Please fill all required fields");
    }

    // Convert DueDate to ISO string with time for Appwrite
    const taskData = {
      ...formData,
      DueDate: new Date(formData.DueDate).toISOString(),
    };

    onSave(taskData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-brightness-50 backdrop-blur-sm bg-opacity-30 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md sm:max-w-lg">
        <h2 className="text-lg font-semibold mb-4">
          {task ? "Edit Task" : "Add New Task"}
        </h2>

        <input
          type="text"
          name="Name"
          placeholder="Task Name"
          value={formData.Name}
          onChange={handleChange}
          className="w-full mb-2 px-3 py-2 border rounded"
        />

        <textarea
          name="Description"
          placeholder="Description"
          value={formData.Description}
          onChange={handleChange}
          className="w-full mb-2 px-3 py-2 border rounded resize-none"
          rows={4}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <select
            name="Priority"
            value={formData.Priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            {priorityOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            name="Status"
            value={formData.Status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <input
          type="date"
          name="DueDate"
          value={formData.DueDate}
          onChange={handleChange}
          className="w-full my-2 px-3 py-2 border rounded"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 rounded bg-green-500 text-white"
          >
            {task ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
