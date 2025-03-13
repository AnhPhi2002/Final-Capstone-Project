const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-lg text-gray-700">
          You do not have permission to view this page.
        </p>
        <a
          href="/log-in"
          className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default AccessDenied;