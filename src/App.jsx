import { useState, useEffect, useReducer } from "react";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const initialState = {
  timers: JSON.parse(localStorage.getItem("timers")) || [],
  history: JSON.parse(localStorage.getItem("history")) || [],
  categories: JSON.parse(localStorage.getItem("categories")) || [
    "Workout",
    "Study",
    "Break",
  ],
};

function appReducer(state, action) {
  let updatedTimers, newHistory;

  switch (action.type) {
    case "ADD_TIMER":
      const newTimer = {
        id: Date.now(),
        name: action.payload.name,
        duration: action.payload.duration,
        remaining: action.payload.duration,
        category: action.payload.category,
        status: "stopped",
        progress: 0,
        alertAtHalf: action.payload.alertAtHalf,
        alerted: false,
      };
      return {
        ...state,
        timers: [...state.timers, newTimer],
      };

    case "START_TIMER":
      updatedTimers = state.timers.map((timer) =>
        timer.id === action.payload ? { ...timer, status: "running" } : timer
      );
      return { ...state, timers: updatedTimers };

    case "PAUSE_TIMER":
      updatedTimers = state.timers.map((timer) =>
        timer.id === action.payload ? { ...timer, status: "paused" } : timer
      );
      return { ...state, timers: updatedTimers };

    case "RESET_TIMER":
      updatedTimers = state.timers.map((timer) =>
        timer.id === action.payload
          ? {
              ...timer,
              status: "stopped",
              remaining: timer.duration,
              progress: 0,
              alerted: false,
            }
          : timer
      );
      return { ...state, timers: updatedTimers };

    case "TICK":
      updatedTimers = state.timers.map((timer) => {
        if (timer.status !== "running") return timer;

        const newRemaining = timer.remaining - 1;
        const newProgress = Math.round(
          ((timer.duration - newRemaining) / timer.duration) * 100
        );
        let newStatus = timer.status;

        if (newRemaining <= 0) {
          newStatus = "completed";
          newHistory = [
            ...state.history,
            {
              id: timer.id,
              name: timer.name,
              category: timer.category,
              completedAt: new Date().toISOString(),
              duration: timer.duration,
            },
          ];
        }
        

        return {
          ...timer,
          remaining: newRemaining > 0 ? newRemaining : 0,
          status: newRemaining <= 0 ? "completed" : timer.status,
          progress: newProgress,
          alerted:
            timer.alerted ||
            (timer.alertAtHalf && newProgress >= 50 && !timer.alerted),
        };
      });

      return {
        ...state,
        timers: updatedTimers,
        history: newHistory || state.history,
      };

    case "START_ALL":
      updatedTimers = state.timers.map((timer) =>
        timer.category === action.payload && timer.status !== "completed"
          ? { ...timer, status: "running" }
          : timer
      );
      return { ...state, timers: updatedTimers };

    case "PAUSE_ALL":
      updatedTimers = state.timers.map((timer) =>
        timer.category === action.payload && timer.status === "running"
          ? { ...timer, status: "paused" }
          : timer
      );
      return { ...state, timers: updatedTimers };

    case "RESET_ALL":
      updatedTimers = state.timers.map((timer) =>
        timer.category === action.payload
          ? {
              ...timer,
              status: "stopped",
              remaining: timer.duration,
              progress: 0,
              alerted: false,
            }
          : timer
      );
      return { ...state, timers: updatedTimers };

    case "ADD_CATEGORY":
      if (state.categories.includes(action.payload)) return state;
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };

    case "DELETE_TIMER":
      return {
        ...state,
        timers: state.timers.filter((timer) => timer.id !== action.payload),
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        timers: state.timers.filter((timer) => timer.status !== "completed"),
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [completedTimer, setCompletedTimer] = useState(null);


  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(state.timers));
    localStorage.setItem("history", JSON.stringify(state.history));
    localStorage.setItem("categories", JSON.stringify(state.categories));
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.timers.some((timer) => timer.status === "running")) {
        dispatch({ type: "TICK" });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timers]);

  useEffect(() => {
    const completedTimer = state.timers.find(
      (timer) => timer.status === "completed" && timer.remaining === 0
    );

    if (completedTimer) {
      setCompletedTimer(completedTimer);
      setShowModal(true);

      setTimeout(() => {
        dispatch({ type: "RESET_TIMER", payload: completedTimer.id });
        setShowModal(false);
      }, 3000);
    }
  }, [state.timers]);

  useEffect(() => {
    state.timers.forEach((timer) => {
      if (timer.alerted && timer.alertAtHalf) {
        alert(`Halfway point reached for ${timer.name}!`);
        dispatch({
          type: "PAUSE_TIMER",
          payload: timer.id,
        });
      }
    });
  }, [state.timers]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-indigo-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <i className="fas fa-clock mr-2"></i>
              Focus Timer
            </Link>
            <div className="flex space-x-4">
              <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-lg">
                <i className="fas fa-home mr-2"></i>Timers
              </Link>
              <Link
                to="/history"
                className="hover:bg-gray-700 px-3 py-2 rounded transition"
              >
                <i className="fas fa-history mr-2"></i>History
              </Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={<HomeScreen state={state} dispatch={dispatch} />}
            />
            <Route
              path="/history"
              element={
                <HistoryScreen history={state.history} dispatch={dispatch} />
              }
            />
          </Routes>
        </div>

        {showModal && completedTimer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100 opacity-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Timer Completed!
                </h3>
                <p className="text-xl text-indigo-600 font-semibold mb-6">
                  {completedTimer.name}
                </p>
                <p className="text-gray-600 mb-6">
                  Great job! You've successfully completed your timer.
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
