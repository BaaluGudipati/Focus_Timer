
import  { useState } from 'react';
import TimerForm from '../components/TimerForm';
import TimerList from '../components/TimerList';

const HomeScreen = ({ state, dispatch }) => {
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...state.categories];
  
  const filteredTimers = activeCategory === 'All' 
    ? state.timers 
    : state.timers.filter(timer => timer.category === activeCategory);
  
  const groupedTimers = state.categories.reduce((groups, category) => {
    const categoryTimers = state.timers.filter(timer => timer.category === category);
    if (categoryTimers.length > 0) {
      groups[category] = categoryTimers;
    }
    return groups;
  }, {});
  
  const handleAddCategory = (category) => {
    if (category && !state.categories.includes(category)) {
      dispatch({ type: 'ADD_CATEGORY', payload: category });
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Timer Dashboard</h1>
          <p className="text-gray-600">Manage your timers efficiently</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center"
          >
            <i className={`fas fa-${showForm ? 'times' : 'plus'} mr-2`}></i>
            {showForm ? 'Cancel' : 'Add Timer'}
          </button>
          <button 
            onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition flex items-center"
          >
            <i className="fas fa-trash-alt mr-2"></i>
            Clear Completed
          </button>
        </div>
      </div>
      
      {showForm && (
        <TimerForm 
          categories={state.categories}
          onAddCategory={handleAddCategory}
          onAddTimer={(timer) => {
            dispatch({ type: 'ADD_TIMER', payload: timer });
            setShowForm(false);
          }}
        />
      )}
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <TimerList 
        timers={filteredTimers}
        groupedTimers={groupedTimers}
        activeCategory={activeCategory}
        dispatch={dispatch}
      />
    </div>
  );
};

export default HomeScreen;