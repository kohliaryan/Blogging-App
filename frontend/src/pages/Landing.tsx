import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Unleash Your Creativity, <br /> Share Your Story with the World
        </h1>
        <p className="text-lg text-gray-200 mb-12">
          Blogging made simple. Your voice. Your platform.
        </p>

        <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-transform transform hover:scale-105" onClick={()=>navigate("/signup")}>
          Get Started
        </button>
      </div>
    </div>
  );
}
