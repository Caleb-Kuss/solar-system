const SkeletonLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-300 w-3/4 p-4 rounded-md">
        <div className="flex space-y-2 mb-4">
          <div className="animate-pulse bg-gray-400 w-3/4 h-4 rounded-md"></div>
        </div>
        <div className="flex space-y-2 mb-4">
          <div className="animate-pulse bg-gray-400 w-full h-4 rounded-md"></div>
        </div>
        <div className="flex space-y-2 mb-4">
          <div className="animate-pulse bg-gray-400 w-5/6 h-4 rounded-md"></div>
        </div>
        <div className="flex space-y-2 mb-4">
          <div className="animate-pulse bg-gray-400 w-4/5 h-4 rounded-md"></div>
        </div>
        <div className="flex space-y-2">
          <div className="animate-pulse bg-gray-400 w-2/3 h-4 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
