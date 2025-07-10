# ⏱️ Focus Timer

A clean, powerful, and responsive multi-timer web application built with **React** and **Tailwind CSS**. Organize your time, stay productive, and manage multiple countdowns across categories — all with local persistence and helpful alerts.

---
### ✅ Live Demo

[🔗 View Deployed App](https://focus-timer-eight-fawn.vercel.app/)

## 🚀 Features

### 🔹 Core Features

- **Add Timer**
  - Create new timers with name, duration, and category
  - Set optional halfway alerts
  - Timers are persisted in localStorage

- **Timer List with Grouping**
  - Display timers grouped by categories
  - Expandable/collapsible category sections
  - Show timer name, remaining time, and status (Running, Paused, Completed)

- **Timer Management**
  - Start, pause, and reset individual timers
  - Mark timers as completed when reaching zero
  - Delete timers

- **Progress Visualization**
  - Color-coded progress bar for each timer
  - Clear visual indication of remaining time

- **Bulk Actions**
  - Start all timers in a category
  - Pause all running timers in a category
  - Reset all timers in a category

- **User Feedback**
  - On-screen completion modal with message
  - Optional halfway alerts

---

### 🧠 Enhanced Functionality

- **Timer History**
  - Automatically logs completed timers
  - Shows name, duration, category, and completion time
  - Filter history by category
  - Export timer history as JSON

- **Category Management**
  - Add new categories on the fly
  - Delete existing categories
  - Filter timers by selected category

- **Responsive Design**
  - Fully responsive UI for mobile, tablet, and desktop
  - Clean and intuitive user experience

---

## ⚙️ Technical Details

| Feature         | Technology      |
|----------------|-----------------|
| Frontend       | React           |
| Styling        | Tailwind CSS    |
| State          | `useReducer` + Context API |
| Routing        | React Router    |
| Persistence    | `localStorage`  |
| Timer Logic    | `setInterval`   |

---

## 📦 Installation

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

---

### 🛠 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/BaaluGudipati/Focus_Timer.git

# Navigate into the project folder
cd Focus_Timer

# Install dependencies
npm install

# Start the development server
npm run dev
