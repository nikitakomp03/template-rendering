import { useEffect, useState } from "react";
import { fetchUsers, toggleAdmin } from "../api/userApi";
import AddUserModal from "../components/modals/AddUserModal";
import { useAuth } from "../context/AuthContext";

export default function UserList() {
  const { user, activeOrg } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState("");

  /**
   * RULE:
   * - Super Admin → can manage users
   * - Admin → can manage users (make/remove admin)
   */
  const canManageUsers =
    user?.is_super_admin || user?.role === "ADMIN";

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      // backend expects org_name (hardcoded / agreed)
      const res = await fetchUsers(activeOrg?.name);

      setUsers(res.data?.users || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setError("Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeOrg) {
      loadUsers();
    }
  }, [activeOrg]);

  const handleMakeAdmin = async (userId) => {
    try {
      await toggleAdmin(userId, true);
      loadUsers();
    } catch (err) {
      console.error("Failed to make admin", err);
    }
  };

  const handleRemoveAdmin = async (userId) => {
    try {
      await toggleAdmin(userId, false);
      loadUsers();
    } catch (err) {
      console.error("Failed to remove admin", err);
    }
  };

  /**
   * Permission helpers (VERY IMPORTANT)
   */
  const canPromoteToAdmin = (targetUser) => {
    if (!canManageUsers) return false;

    // cannot promote someone who is already admin
    if (targetUser.role === "ADMIN") return false;

    return true;
  };

  const canDemoteAdmin = (targetUser) => {
    if (!canManageUsers) return false;

    // cannot remove admin role from yourself (optional but safer)
    if (targetUser.id === user?.id) return false;

    // only applies if target is admin
    if (targetUser.role !== "ADMIN") return false;

    return true;
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>User Management</h3>

        {canManageUsers && (
          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            + Add User
          </button>
        )}
      </div>

      {loading && <p>Loading users...</p>}

      {!loading && error && (
        <p className="text-danger">{error}</p>
      )}

      {!loading && !error && users.length === 0 && (
        <p>No users found for this organisation.</p>
      )}

      {!loading && users.length > 0 && (
        <table className="table table-bordered table-hover bg-white">
          <thead className="table-light">
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Organisation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.username}</td>
                <td>{u.role}</td>
                <td>{u.org_name}</td>
                <td>
                  {canPromoteToAdmin(u) && (
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleMakeAdmin(u.id)}
                    >
                      Make Admin
                    </button>
                  )}

                  {canDemoteAdmin(u) && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleRemoveAdmin(u.id)}
                    >
                      Remove Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSuccess={loadUsers}
        />
      )}
    </div>
  );
}
