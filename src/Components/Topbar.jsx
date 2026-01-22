export default function Topbar({ user }) {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow sticky top-0 z-10">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-gray-700">Hi, {user.name || user.email}</span>
        )}
      </div>
    </header>
  );
}
