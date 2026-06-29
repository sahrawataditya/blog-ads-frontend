"use client";

import { fetcher } from "@/lib/fether";
import { useEffect, useState } from "react";
import TopBanner from "@/lib/TopBanner";
import BottomBanner from "@/lib/BottomBanner";
import SidebarAd from "@/lib/SidebarAd";
import AddComp from "@/lib/AddComp";

interface Post {
  _id: string;
  title: string;
  body: string;
  postedBy: string;
  createdAt: string;
}

const AdminPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await fetcher.get("/post/get-all");
      if (res.data?.posts) setPosts(res.data.posts);
    } catch {
      alert("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetcher.post("/post/create", { title, body });
      alert("Post created!");
      setTitle("");
      setBody("");
      fetchPosts();
    } catch {
      alert("Failed to create post");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    try {
      await fetcher.delete(`/post/delete/${id}`);
      alert("Post deleted!");
      fetchPosts();
    } catch {
      alert("Failed to delete post");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await fetcher.put(`/post/update/${id}`, { title: editTitle, body: editBody });
      alert("Post updated!");
      setEditId(null);
      fetchPosts();
    } catch {
      alert("Failed to update post");
    }
  };

  return (
    <div>
      <TopBanner />
      <h1 className="text-3xl font-bold mb-6">Manage Posts</h1>

      <form onSubmit={handleCreate} className="flex gap-3 mb-8 flex-wrap">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-64"
          required
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="border p-2 rounded w-64"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Post
        </button>
      </form>

      <AddComp id="admin-posts-incontent" h={250} w={300} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Title</th>
              <th className="border p-2 text-left">Body</th>
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td className="border p-2">
                  {editId === post._id ? (
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    post.title
                  )}
                </td>
                <td className="border p-2 max-w-xs truncate">
                  {editId === post._id ? (
                    <textarea
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    post.body.slice(0, 100)
                  )}
                </td>
                <td className="border p-2 text-sm">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="border p-2 flex gap-2">
                  {editId === post._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(post._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => { setEditId(post._id); setEditTitle(post.title); setEditBody(post.body); }}
                      className="bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post._id)}
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

export default AdminPosts;
