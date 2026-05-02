import { useEffect, useMemo, useState } from "react";
import { Log } from "./logging_middleware/log";
import "./App.css";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await Log(TOKEN, "frontend", "info", "component", "Fetching users");

        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();

        setUsers(data);
        await Log(TOKEN, "frontend", "info", "component", "Users fetched successfully");
      } catch (err) {
        setError(true);
        await Log(TOKEN, "frontend", "error", "component", "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!search) return;

    const t = setTimeout(() => {
      Log(TOKEN, "frontend", "debug", "component", `Search: ${search}`);
    }, 400);

    return () => clearTimeout(t);
  }, [search]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>User Dashboard</h1>

      <h2 style={{ color: "#aaa" }}>
        {filteredUsers.length} users found
      </h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {loading && (
        <div style={{ marginTop: "20px" }}>
          <div className="spinner"></div>
        </div>
      )}

      {error && <p style={{ color: "red" }}>Failed to load users</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredUsers.map((user) => (
          <div key={user.id} className="card">
            

            <div className="avatar">
              {user.name.charAt(0)}
            </div>

            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>

      {!loading && filteredUsers.length === 0 && (
        <p style={{ marginTop: "20px", color: "#888" }}>
          No users match your search
        </p>
      )}
    </div>
  );
}

export default App;