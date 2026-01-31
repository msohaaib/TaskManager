import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import StatsCard from "../Components/StatsCard";
import TaskTable from "../Components/TaskTable";
import TaskModal from "../Components/TaskModal";
import { databases, Query, Permission, Role } from "../appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TASKS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const navigate = useNavigate();
  const priorityOptions = ["All", "High", "Medium", "Low"];

  // ✅ Fetch tasks from Appwrite
  const fetchTasks = async (userId) => {
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        TASKS_COLLECTION_ID,
        [Query.equal("userId", userId)],
      );
      setTasks(res.documents);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Fetch current user
  useEffect(() => {
    getCurrentUser()
      .then((u) => {
        setUser(u);
        fetchTasks(u.$id);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  // Logout
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Generate user initials
  const getUserInitials = (name, email) => {
    if (name) {
      const names = name.split(" ");
      return names.length > 1
        ? (names[0][0] + names[1][0]).toUpperCase()
        : names[0][0].toUpperCase();
    }
    return email ? email[0].toUpperCase() : "U";
  };

  // Add task
  const handleAddTask = async (newTask) => {
    try {
      const taskWithUser = {
        ...newTask,
        userId: user.$id,
      };

      const doc = await databases.createDocument(
        DATABASE_ID,
        TASKS_COLLECTION_ID,
        "unique()", // auto-generate id
        taskWithUser,
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ],
      );
      setTasks([doc, ...tasks]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Edit task
  const handleEditTask = async (taskId, updatedTask) => {
    try {
      const doc = await databases.updateDocument(
        DATABASE_ID,
        TASKS_COLLECTION_ID,
        taskId,
        updatedTask,
      );
      setTasks(tasks.map((t) => (t.$id === taskId ? doc : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await databases.deleteDocument(DATABASE_ID, TASKS_COLLECTION_ID, taskId);
      setTasks(tasks.filter((t) => t.$id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Filter tasks for page, search, and priority
  const getTasksForPage = () => {
    let filtered = [...tasks];

    switch (activePage) {
      case "Completed Tasks":
        filtered = filtered.filter((t) => t.Status === "Completed");
        break;
      case "In Progress Tasks":
        filtered = filtered.filter((t) => t.Status === "In Progress");
        break;
      case "Overdue Tasks":
        {
          const today = new Date();
          filtered = filtered.filter(
            (t) => new Date(t.DueDate) < today && t.Status !== "Completed",
          );
        }
        break;
      default:
        break;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.Name.toLowerCase().includes(q) ||
          t.Description?.toLowerCase().includes(q) ||
          t.Status.toLowerCase().includes(q) ||
          t.Priority.toLowerCase().includes(q),
      );
    }

    if (priorityFilter !== "All") {
      filtered = filtered.filter((t) => t.priority === priorityFilter);
    }

    return filtered;
  };

  const tasksToShow = getTasksForPage();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        active={activePage}
        setActive={setActivePage}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-auto">
        <div className="flex flex-wrap justify-between items-center p-4 bg-white shadow sticky top-0 z-10 gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {priorityOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setEditTask(null);
              setShowTaskModal(true);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            + Add Task
          </button>

          {user && (
            <div className="flex items-center gap-4 ml-auto">
              <span className="font-semibold text-gray-700">
                {user.name || user.email}
              </span>
              {user.prefs?.avatar ? (
                <img
                  src={user.prefs.avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold border-2 border-gray-300">
                  {getUserInitials(user.name, user.email)}
                </div>
              )}
            </div>
          )}
        </div>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatsCard title="Total Tasks" value={tasks.length} />
            <StatsCard
              title="Completed"
              value={tasks.filter((t) => t.status === "Completed").length}
            />
            <StatsCard
              title="Pending"
              value={tasks.filter((t) => t.status !== "Completed").length}
            />
            <StatsCard
              title="Overdue Tasks"
              value={
                tasks.filter(
                  (t) =>
                    new Date(t.dueDate) < new Date() &&
                    t.status !== "Completed",
                ).length
              }
            />
          </div>

          <TaskTable
            tasks={tasksToShow}
            onEdit={(task) => {
              setEditTask(task);
              setShowTaskModal(true);
            }}
            onDelete={handleDeleteTask}
          />
        </main>
      </div>

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        task={editTask}
        onSave={(taskData) => {
          if (editTask?.$id) handleEditTask(editTask.$id, taskData);
          else handleAddTask(taskData);
          setEditTask(null);
        }}
      />
    </div>
  );
};

export default Dashboard;
