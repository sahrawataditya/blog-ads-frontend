"use client";

import { fetcher } from "@/lib/fether";
import { useParams } from "next/navigation";
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

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetcher.get(`/post/get/${id}`);
        if (res.data?.post) {
          setPost(res.data.post);
        }
      } catch {
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id]);

  if (loading) return <div className="max-w-[1290px] mx-auto p-8"><p>Loading...</p></div>;
  if (error) return <div className="max-w-[1290px] mx-auto p-8"><p className="text-red-500">{error}</p></div>;
  if (!post) return <div className="max-w-[1290px] mx-auto p-8"><p>Post not found.</p></div>;

  return (
    <div className="max-w-[1290px] mx-auto p-8">
      <TopBanner />

      <div className="flex gap-8 mt-8">
        <article className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm text-gray-400 mb-6">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          <AddComp id="in-content-detail" h={250} w={300} />

          <p className="text-lg leading-relaxed whitespace-pre-wrap mt-6">{post.body}</p>

          <div className="mt-8">
            <BottomBanner />
          </div>
        </article>

        <aside className="w-[300px] hidden lg:block">
          <SidebarAd />
        </aside>
      </div>
    </div>
  );
};

export default PostDetail;
