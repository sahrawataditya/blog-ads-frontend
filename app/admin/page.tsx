"use client";

import AddComp from "@/lib/AddComp";
import { fetcher } from "@/lib/fether";
import TopBanner from "@/lib/TopBanner";
import BottomBanner from "@/lib/BottomBanner";
import SidebarAd from "@/lib/SidebarAd";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState(0);
  const [posts, setPosts] = useState(0);

  const getStats = async () => {
    try {
      const [uRes, pRes] = await Promise.all([
        fetcher("/users/get-all"),
        fetcher("/post/get-all"),
      ]);
      setUsers(uRes.data?.users?.length || 0);
      setPosts(pRes.data?.posts?.length || 0);
    } catch {
      // backend bug may cause 404 for posts
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div>
      <TopBanner />
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="flex gap-6 mb-8">
        <div className="p-6 border rounded-xl flex-1">
          <h3 className="text-lg text-gray-500">Total Users</h3>
          <p className="text-4xl font-bold mt-2">{users}</p>
        </div>
        <div className="p-6 border rounded-xl flex-1">
          <h3 className="text-lg text-gray-500">Total Posts</h3>
          <p className="text-4xl font-bold mt-2">{posts}</p>
        </div>
      </div>

      <AddComp id="admin-dash-incontent" h={250} w={300} />
      <SidebarAd />
      <BottomBanner />
    </div>
  );
}
