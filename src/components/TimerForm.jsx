
import { useState } from "react";

const TimerForm = ({ categories, onAddTimer, onAddCategory }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(300); // 5 minutes
  const [category, setCategory] = useState(categories[0] || "");
  const [newCategory, setNewCategory] = useState("");
  const [alertAtHalf, setAlertAtHalf] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    onAddTimer({
      name,
      duration,
      category: newCategory ? newCategory : category,
      alertAtHalf,
    });

    setName("");
    setDuration(300);
    setCategory(categories[0] || "");
    setNewCategory("");
    setAlertAtHalf(false);
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory);
      setCategory(newCategory);
      setNewCategory("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-xl font-bold text-gray-800  dark:text-white mb-4">Create New Timer</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium dark:text-gray-300  mb-2">
              Timer Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"

              placeholder="e.g., Workout Timer "
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium dark:text-gray-300  mb-2">
              Duration (minutes:seconds)
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={Math.floor(duration / 60)}
                onChange={(e) =>
                  setDuration(
                    parseInt(e.target.value || 0) * 60 + (duration % 60)
                  )
                }
                min="0"
               className="w-20 px-4 py-2 bg-white text-gray-900 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"

              />
              <span className="mx-2 dark:text-white">:</span>
              <input
              
                type="number"
                value={duration % 60}
                onChange={(e) =>
                  setDuration(
                    Math.floor(duration / 60) * 60 +
                      parseInt(e.target.value || 0)
                  )
                }
                min="0"
                max="59"
                className="w-20 px-4 py-2 bg-white text-gray-900 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"

              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 dark:text-white">
              Category
            </label>
            <div className="flex gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 px-4 py-2 bg-white text-gray-900 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"

              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-2 flex">
              <input
                id="newCategoryInput"
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add new category"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddNewCategory}
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2  dark:text-white">
              Alert
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={alertAtHalf}
                onChange={(e) => setAlertAtHalf(e.target.checked)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Alert at halfway point</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lghover:bg-indigo-700 dark:hover:bg-indigo-500 transition w-full"
          >
            Create Timer
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimerForm;
