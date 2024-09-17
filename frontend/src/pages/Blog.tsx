import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../component/LoadingScreen";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

interface Author {
  name: string;
}

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/landing");
      return;
    }

    axios
      .get(`https://backend.kohliaryan2004.workers.dev/api/v1/blog/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setPost(response.data.post);
        setAuthor(response.data.author); // Get the author details
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!post || !author) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
        <h2 className="text-white text-2xl font-semibold">
          Blog not found or an error occurred.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex flex-col items-center">
      <h1 className="text-white text-4xl font-bold mt-10 mb-6">{post.title}</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl transform transition-all duration-300 hover:shadow-2xl">
        <p className="text-gray-800 text-lg mb-4">{post.content}</p>
        <p className="text-gray-600 italic mb-2">Author: {author.name}</p>
        <button
          onClick={() => navigate(-1)} // Navigate back to the blog list page
          className="mt-6 bg-purple-600 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-all"
        >
          See All Blogs
        </button>
      </div>
    </div>
  );
};

