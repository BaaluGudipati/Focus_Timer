const Timer = ({ timer, dispatch }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "running":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "running":
        return "fa-play text-green-600";
      case "paused":
        return "fa-pause text-yellow-600";
      case "completed":
        return "fa-check text-blue-600";
      default:
        return "fa-stop text-gray-600";
    }
  };

  return (
    <div className="p-4 hover:bg-gray-50 transition">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800 mr-3">
              {timer.name}
            </h3>
            <span
              className={`text-xs px-2.5 py-0.5 rounded ${getStatusColor(
                timer.status
              )}`}
            >
              <i className={`fas ${getStatusIcon(timer.status)} mr-1`}></i>
              {timer.status.charAt(0).toUpperCase() + timer.status.slice(1)}
            </span>
            {timer.alertAtHalf && (
              <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded">
                <i className="fas fa-bell mr-1"></i>Half Alert
              </span>
            )}
          </div>

          <div className="flex items-center">
            <div className="text-2xl font-mono font-bold text-indigo-600 mr-4">
              {formatTime(timer.remaining)}
            </div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    timer.progress < 50
                      ? "bg-green-500"
                      : timer.progress < 80
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${timer.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          {timer.status !== "running" && timer.status !== "completed" && (
            <button
              onClick={() =>
                dispatch({ type: "START_TIMER", payload: timer.id })
              }
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              title="Start"
            >
              Start
            </button>
          )}

          {timer.status === "running" && (
            <button
              onClick={() =>
                dispatch({ type: "PAUSE_TIMER", payload: timer.id })
              }
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              title="Pause"
            >
              Pause
            </button>
          )}

          <button
            onClick={() => dispatch({ type: "RESET_TIMER", payload: timer.id })}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            title="Reset"
          >
            Reset
          </button>

          <button
            onClick={() =>
              dispatch({ type: "DELETE_TIMER", payload: timer.id })
            }
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            title="Delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
