const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-teal-600 mb-4">404</h1>
      <p className="text-2xl text-slate-800 mb-2">Page Not Found</p>
      <p className="text-slate-600 mb-6">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
