import { useMemo, useState } from "react";
import { type User } from "../types";

type Props = {
  users: User[];
  loading: boolean;
  error: boolean;
  onDelete: (id: string) => void;
  onReload: () => void;
};

export function UserTable({ users, loading, error, onDelete, onReload }: Props) {
  const [search, setSearch] = useState("");

  // Recalcula el filtro solo cuando cambia el listado o el término de búsqueda,
  // evitando iterar el array completo en cada render del componente padre.
  const filteredUsers = useMemo(
    () => users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())),
    [users, search]
  );

  return (
    <div className="bg-white rounded-4 shadow-sm" style={{ border: "1px solid #e9ecef" }}>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
        <span className="fw-semibold small">Todos los usuarios</span>
        <div className="d-flex gap-2">
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="form-control form-control-sm rounded-3"
            style={{ width: 220 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-sm btn-outline-secondary rounded-3"
            onClick={onReload}
            disabled={loading}
            title="Recargar datos"
          >
            {loading
              ? <span className="spinner-border spinner-border-sm" role="status" />
              : "↺"
            }
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-secondary small">Cargando usuarios...</p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger m-4 rounded-3">
          Error al cargar usuarios
        </div>
      )}

      {/* TABLE */}
      {!loading && !error && filteredUsers.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr
                className="small text-secondary"
                style={{ background: "#f9fafb", borderBottom: "1px solid #e9ecef" }}
              >
                <th className="ps-4 py-3 fw-semibold">ID</th>
                <th className="py-3 fw-semibold">Usuario</th>
                <th className="py-3 fw-semibold">Email</th>
                <th className="py-3 fw-semibold">Direccion</th>
                <th className="py-3 fw-semibold">Telefono</th>
                <th className="py-3 fw-semibold text-end pe-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid #f1f3f5" }}>
                  <td className="ps-4">
                    <span
                      className="badge rounded-pill"
                      style={{ background: "#f1f5f9", color: "#64748b", fontWeight: 500 }}
                    >
                      {user.id}
                    </span>
                  </td>

                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                        style={{ width: 34, height: 34, background: "#ede9fe", color: "#7c3aed", fontSize: 13 }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="fw-semibold small">{user.name}</div>
                        <div className="text-secondary" style={{ fontSize: 12 }}>@{user.username}</div>
                      </div>
                    </div>
                  </td>

                  <td className="small">{user.email.toLowerCase()}</td>

                  <td className="small">
                    {user.address.street ? (
                      <>
                        {user.address.street}, {user.address.suite}
                        <div className="text-secondary" style={{ fontSize: 12 }}>{user.address.city}</div>
                      </>
                    ) : (
                      <span className="text-secondary">—</span>
                    )}
                  </td>

                  <td className="small">
                    {user.phone || <span className="text-secondary">—</span>}
                  </td>

                  <td className="text-end pe-4">
                    <button
                      className="btn btn-sm rounded-3"
                      style={{ background: "#fff1f2", color: "#e11d48", border: "1px solid #fecdd3" }}
                      onClick={() => onDelete(user.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && filteredUsers.length === 0 && (
        <div className="text-center py-5">
          <div
            className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3"
            style={{ width: 56, height: 56, background: "#f1f5f9", color: "#94a3b8", fontSize: 24 }}
          >
            ?
          </div>
          <h6 className="fw-semibold">No se encontraron usuarios</h6>
          <p className="text-secondary small mb-0">
            Intenta con otro termino o agrega un nuevo usuario
          </p>
        </div>
      )}
    </div>
  );
}
