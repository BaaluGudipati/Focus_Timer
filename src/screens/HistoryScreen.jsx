import { useState } from "react";

const HistoryScreen = ({ history, dispatch }) => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(history.map((item) => item.category))];

  const filteredHistory =
    filter === "All"
      ? history
      : history.filter((item) => item.category === filter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;

    const exportFileDefaultName = "timer-history.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Timer History
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your completed timers
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={exportHistory}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-500"
          >
            <i className="fas fa-file-export mr-2"></i>
            Export History
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full ${
                filter === category
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              {category}
             
            </button>
          ))}
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
          <i className="fas fa-history text-5xl text-gray-400 dark:text-gray-600 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
            No History Yet
          </h3>
          <p className="text-gray-500 dark:text-gray-300">
            Your completed timers will appear here
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-100 dark:bg-gray-800 font-semibold text-gray-700 dark:text-white">
            <div >Timer Name</div>
            <div>Details</div>
            <div>Completed At</div>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="font-medium text-gray-800 dark:text-white">{item.name}</div>
                <div>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                    {item.category}
                  </span>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    {Math.floor(item.duration / 60)}m {item.duration % 60}s
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDate(item.completedAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;
