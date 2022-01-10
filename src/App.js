import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import Footer from "./components/Footer";
function App() {

  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }
  fetchTasks()

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'delete',
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const toggleToTask = await fetchTask(id)
    const updTask = { ...toggleToTask, reminder: !toggleToTask.reminder }
    const res = await fetch(
      `http://localhost:5000/tasks/${id}`, {
      method: 'Put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updTask)
    }
    );
    const data = await res.json();
    setTasks(tasks.map((task) => task.id == id ? { ...task, reminder: data.reminder } : task))
  }

  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    setTasks([...tasks, data]);

  }

  const [showAddTask, setShowAddTask] = useState(false);

  return (
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Route path='/' exact render={(props) => {
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Task'}
          </>
        }} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
  );
}

export default App;
