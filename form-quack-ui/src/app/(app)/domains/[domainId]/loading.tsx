"use client";

const LoadingPage = () => {
  return (
    <div className="h-64 w-full bg-white shadow-md rounded-lg p-4 mb-8">
      <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded mb-4" />
      <div className="h-40 w-full bg-gray-200 animate-pulse rounded" />
    </div>
  );
};

export default LoadingPage;
