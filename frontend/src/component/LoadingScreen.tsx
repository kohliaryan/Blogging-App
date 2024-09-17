const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="text-center">
        {/* Animated Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600 border-opacity-75"></div>
        {/* Loading Text */}
        <p className="mt-4 text-white text-lg font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
