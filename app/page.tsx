"use client";

import { fetcher } from "@/lib/fether";
import { useEffect, useState } from "react";
import Link from "next/link";
import TopBanner from "@/lib/TopBanner";
import SidebarAd from "@/lib/SidebarAd";
import AddComp from "@/lib/AddComp";

interface Post {
  _id: string;
  title: string;
  body: string;
  postedBy: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetcher.get("/post/get-all");
        if (res.data?.posts) {
          setPosts(res.data.posts);
        }
      } catch {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-[1290px] mx-auto p-8">
      <TopBanner />

      <div className="flex gap-8 mt-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>

          {loading && <p className="text-gray-500">Loading posts...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && posts.length === 0 && (
            <p className="text-gray-500">No posts yet.</p>
          )}

          <div className="flex flex-col gap-6">
            {posts.map((post, i) => (
              <div key={post._id}>
                <Link href={`/post/${post._id}`}>
                  <div className="border rounded-lg p-4 hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-gray-600 mt-2">
                      {post.body.slice(0, 200)}
                      {post.body.length > 200 ? "..." : ""}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
                {i === 0 && <div className="my-4"><AddComp id="in-content-1" h={250} w={300} /></div>}
                {i === 2 && <div className="my-4"><AddComp id="in-content-2" h={250} w={300} /></div>}
              </div>
            ))}
          </div>
        </div>

        <aside className="w-[300px] hidden lg:block">
          <SidebarAd />
        </aside>
      </div>
    </div>
  );
}
