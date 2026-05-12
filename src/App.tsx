import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const result = await response.json();
      setUsers(result);
    } catch {
      setUsers([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const title = error
    ? "Error al cargar los datos"
    : loading
      ? "Cargando..."
      : "Listado Usuarios";

  const filteredUsers = useMemo(() => {
    return users.filter((user: User) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "#f4f7fb",
      }}
    >
      <div className="container">
        <div
          className="shadow-sm p-4 rounded-4 bg-white"
          style={{
            border: "1px solid #e9ecef",
          }}
        >
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">{title}</h2>

              {!loading && !error && (
                <p className="text-secondary mb-0">
                  {filteredUsers.length} usuarios encontrados
                </p>
              )}
            </div>

            <div className="d-flex gap-2 w-25">
              <input
                type="text"
                placeholder="Buscar usuario..."
                className="form-control rounded-3"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className="btn btn-outline-secondary rounded-3"
                onClick={fetchData}
                disabled={loading}
                title="Recargar datos"
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" />
                ) : (
                  "↺"
                )}
              </button>
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>

              <p className="mt-3 text-secondary">Cargando usuarios...</p>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="alert alert-danger rounded-3">
              Error al cargar usuarios
            </div>
          )}

          {/* TABLE */}
          {!loading && !error && filteredUsers.length > 0 && (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr
                    style={{
                      borderBottom: "2px solid #dee2e6",
                    }}
                  >
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user: User) => (
                    <tr
                      key={user.id}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <td>
                        <span className="badge bg-dark">{user.id}</span>
                      </td>

                      <td>
                        <div className="fw-semibold">{user.name}</div>

                        <div className="text-secondary small">
                          @{user.username}
                        </div>
                      </td>

                      <td>{user.email.toLowerCase()}</td>

                      <td>
                        {user.address.street}, {user.address.suite}
                        <div className="text-secondary small">
                          {user.address.city}
                        </div>
                      </td>

                      <td>{user.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && filteredUsers.length === 0 && (
            <div className="text-center py-5">
              <h5>No se encontraron usuarios</h5>

              <p className="text-secondary">
                Intenta con otro término de búsqueda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
