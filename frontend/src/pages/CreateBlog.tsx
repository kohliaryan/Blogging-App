import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../component/LoadingScreen";
import { BACKEND_URL } from "../config";

const CreateBlog: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/landing");
      return;
    }

    if (!title || !content) {
      setError("Title and Content cannot be empty.");
      return;
    }

    axios
      .post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .catch((error) => {
        console.error("Error creating post:", error);
        setError("Failed to create blog post. Please try again.");
        alert("Invalid Content")
      })

      .finally(() =>
        navigate("/home")
      )
      
      
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex flex-col items-center">
      <h1 className="text-white text-4xl font-bold mt-10 mb-6">
        Create a New Blog
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-4"
      >
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Blog Title
          </label>
          <input
          minLength={4}
          required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your blog title"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Blog Content
          </label>
          <textarea
          required
          minLength={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your blog content here..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-indigo-600 text-white py-3 rounded-lg transition-all"
        >
          Post Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
