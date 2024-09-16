import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../component/LoadingScreen";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
}

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/landing");
      return;
    }

    axios
      .get("https://backend.kohliaryan2004.workers.dev/api/v1/blog/bulk", {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        const publishedPosts = response.data.posts;
        setPosts(publishedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const shortenContent = (content: string) => {
    return content.length > 100 ? content.slice(0, 100) + "..." : content;
  };

  const goToBlog = (id: number) => {
    navigate(`/blog/${id}`);
  };

  const goToWriteBlog = () => {
    navigate("/post"); 
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex flex-col items-center">
      <h1 className="text-white text-4xl font-bold mt-10 mb-6">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transform transition-all duration-300"
          >
            <h2
              onClick={() => goToBlog(post.id)}
              className="text-lg font-semibold text-purple-700 cursor-pointer hover:text-indigo-600"
            >
              {post.title}
            </h2>
            <p className="text-gray-700 mt-2">{shortenContent(post.content)}</p>
            <button
              onClick={() => navigate("/blog/" + post.id)}
              className="mt-4 bg-purple-600 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-all"
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Add the pen icon for writing a blog */}
      <button
        onClick={goToWriteBlog}
        className="fixed bottom-8 right-8 bg-purple-600 hover:bg-indigo-600 text-white p-4 rounded-full shadow-lg transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
    </div>
  );
};

export default HomePage;
