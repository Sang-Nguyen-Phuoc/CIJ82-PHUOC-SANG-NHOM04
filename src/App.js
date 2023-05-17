import './App.css';
import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Function to add a new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // Function to mark a task as complete
  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    if (taskId) {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } else {
      setTasks([]);
    }
  };

  // Function to filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    }
    return true;
  });

  // Retrieve tasks from local storage on initial load
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">

      <h1>#Todo</h1>
      <div className="functions">
        <ul className="nav">
          <li className="nav-item">
            <a onClick={() => setFilter('all')} className="nav-link all" aria-current="page" href="#">All</a>
          </li>
          <li className="nav-item">
            <a onClick={() => setFilter('active')} className="nav-link active" href="#">Active</a>
          </li>
          <li className="nav-item">
            <a onClick={() => setFilter('completed')} className="nav-link isCompleted" href="#">Completed</a>
          </li>
        </ul>
        <div className="line"></div>
      </div>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={filteredTasks}
        completeTask={completeTask}
        deleteTask={deleteTask}
        filter={filter}
      />
    </div>
  );
}

export default App;