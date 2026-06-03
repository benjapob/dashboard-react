import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { AddUserModal } from "./components/AddUserModal";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { UserTable } from "./components/UserTable";
import { STORAGE_KEY } from "./types";
import type { User } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      if (parsed.length === 0) {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const result = await response.json();
        setUsers(result);
      } else {
        setUsers(parsed);
      }
    } catch {
      setUsers([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  }, [users]);

  const addUser = (user: User) => {
    setUsers([...users, user]);
    setShowModal(false);
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="d-flex min-vh-100" style={{ background: "#f4f7fb" }}>
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        <TopBar />

        <main className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h4 className="fw-bold mb-0">Gestion de Usuarios</h4>
              {!loading && !error && (
                <p className="text-secondary mb-0 mt-1 small">
                  {users.length} usuario{users.length !== 1 ? "s" : ""} en el sistema
                </p>
              )}
            </div>
            <button className="btn btn-primary rounded-3 px-4" onClick={() => setShowModal(true)}>
              + Agregar usuario
            </button>
          </div>

          <UserTable
            users={users}
            loading={loading}
            error={error}
            onDelete={deleteUser}
            onReload={fetchData}
          />
        </main>
      </div>

      {showModal && (
        <AddUserModal onClose={() => setShowModal(false)} onAdd={addUser} />
      )}
    </div>
  );
}

export default App;
