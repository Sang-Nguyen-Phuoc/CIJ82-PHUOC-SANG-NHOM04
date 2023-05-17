import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ addTask }) {
    const [taskText, setTaskText] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskText.trim() === '') {
            return;
        }
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };
        addTask(newTask);
        setTaskText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter a new task"
            />
            <button className='btn btn-primary add' type="submit">Add</button>
        </form>
    );
}

export default TaskForm;
