import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState } from "react";
function App() {
  const [tasks,setTasks] = useState([
    {
        id:1,
        text: 'Food shopping',
        day:  '5th jan 2022',
        reminder: true
    },
    {
        id:2,
        text: 'Rainy Day',
        day:  '5th jan 2022',
        reminder: true
    },
    {
        id:3,
        text: 'Food shopping',
        day:  '5th jan 2022',
        reminder: false
    }
]);
const deleteTask = (id) =>{
      setTasks(tasks.filter((task) => task.id !== id))
}
const toggleReminder = (id) =>{
  setTasks(tasks.map((task) => task.id == id ? {...task, reminder:!task.reminder} : task))
}
const addTask = (task) =>{
  console.log(task);
  const id = Math.floor(Math.random() * 10000) +  1;
  const newTask = {id , ...task};
  setTasks([...tasks, newTask]);

} 
const [showTask , setShowTask] = useState(false);
  return (
    <div className="container">
       <Header onAdd = {()=> setShowTask(!showTask)} />
       {showAddTask && <AddTask onAdd={addTask}  />}
       {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Task'}
    </div>
  );
}

export default App;
