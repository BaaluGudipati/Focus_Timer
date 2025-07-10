import Timer from "./Timer";
import { useState } from "react";

const TimerList = ({ timers, groupedTimers, activeCategory, dispatch }) => {
  if (timers.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center">
        <i className="fas fa-clock text-5xl text-gray-400 dark:text-gray-500 mb-4"></i>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-white">No Timers Yet</h3>
        <p className="text-gray-500 dark:text-gray-300">Add a timer to get started</p>
      </div>
    );
  }

  if (activeCategory === "All") {
    return (
      <div>
        {Object.entries(groupedTimers).map(([category, categoryTimers]) => (
          <CategorySection
            key={category}
            category={category}
            timers={categoryTimers}
            dispatch={dispatch}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <CategorySection
        category={activeCategory}
        timers={timers}
        dispatch={dispatch}
      />
    </div>
  );
};

const CategorySection = ({ category, timers, dispatch }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden mb-6">
      <div
        className="flex justify-between items-center p-4 dark:bg-gray-800 bg-gray-100 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mr-3">
            {category}
          </h2>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium dark:text-whit px-2.5 py-0.5 rounded">
            {timers.length} {timers.length === 1 ? "Timer" : "Timers"}
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex space-x-2 mr-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "START_ALL", payload: category });
              }}
              className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition dark:hover:bg-green-500"
              title="Start All"
            >
              Start
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "PAUSE_ALL", payload: category });
              }}
              className="bg-yellow-500 text-white dark:hover:bg-yellow-400 p-2 rounded-full hover:bg-yellow-600 transition"
              title="Pause All"
            >
              Pause
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "RESET_ALL", payload: category });
              }}
              className="bg-blue-600 dark:hover:bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition"
              title="Reset All"
            >
             Stop
            </button>
          </div>
          <i
            className={`fas fa-chevron-${
              expanded ? "up" : "down"
            } text-gray-500 dark:text-gray-300`}
          ></i>
        </div>
      </div>

      {expanded && (
        <div className="divide-y divide-gray-100">
          {timers.map((timer) => (
            <Timer key={timer.id} timer={timer} dispatch={dispatch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TimerList;
