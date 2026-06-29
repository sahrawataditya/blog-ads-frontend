"use client";

import { fetcher } from "@/lib/fether";
import { useEffect, useState } from "react";
import TopBanner from "@/lib/TopBanner";
import BottomBanner from "@/lib/BottomBanner";
import SidebarAd from "@/lib/SidebarAd";
import AddComp from "@/lib/AddComp";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetcher.get("/users/get-all");
      if (res.data?.users) setUsers(res.data.users);
    } catch {
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetcher.post("/users/add", { name, email, password });
      alert("User added!");
      setName("");
      setEmail("");
      setPassword("");
      fetchUsers();
    } catch {
      alert("Failed to add user");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    try {
      await fetcher.delete(`/users/delete/${id}`);
      alert("User deleted!");
      fetchUsers();
    } catch {
      alert("Failed to delete user");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await fetcher.put(`/users/update/${id}`, { name: editName });
      alert("User updated!");
      setEditId(null);
      setEditName("");
      fetchUsers();
    } catch {
      alert("Failed to update user");
    }
  };

  return (
    <div>
      <TopBanner />
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <form onSubmit={handleAdd} className="flex gap-3 mb-8 flex-wrap">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>

      <AddComp id="admin-users-incontent" h={250} w={300} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">
                  {editId === user._id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border p-1 rounded"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2 flex gap-2">
                  {editId === user._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(user._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => { setEditId(null); setEditName(""); }}
                        className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => { setEditId(user._id); setEditName(user.name); }}
                      className="bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-8">
        <SidebarAd />
      </div>
      <BottomBanner />
    </div>
  );
};

export default AdminUsers;
