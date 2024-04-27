export const Dashboard = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-64 min-h-screen">
          {/* Sidebar Content */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <ul>
              <li className="py-2">Dashboard</li>
              <li className="py-2">Users</li>
              <li className="py-2">Video</li>
              {/* Add more sidebar items as needed */}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="p-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Users</h2>
              <p>Total Users: 1000</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">Products</h2>
              <p>Total Video: 500</p>
            </div>
          </div>

          {/* Charts */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Sales Overview</h2>
            {/* Add your chart component here */}
            <p>Sample Chart</p>
          </div>

          {/* Table */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            {/* Add your table component here */}
            <p>Sample Table</p>
          </div>
        </main>
      </div>
    </>
  );
};
