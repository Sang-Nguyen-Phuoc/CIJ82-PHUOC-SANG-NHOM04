import './TaskList.css';
import { FaTrash } from 'react-icons/fa';

function TaskList({ tasks, completeTask, deleteTask, filter }) {
    const handleDeleteAll = () => {
        // Confirm with the user before deleting all tasks
        if (window.confirm('Are you sure you want to delete all tasks?')) {
            deleteTask(null); // Pass null as the taskId to indicate deleting all tasks
        }
    };

    return (
        <div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <div className='check-box-task'>
                            <input className='checkbox'
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => completeTask(task.id)}
                            />
                            <div className={task.completed ? 'completed' : ''}>{task.text}</div>

                        </div>
                        {filter === "completed" && <button className="del-but" onClick={() => deleteTask(task.id)}>
                            <FaTrash className='icon' />
                        </button>}
                    </li>
                ))}
            </ul>
            {filter === "completed" && <button className='btn btn-danger delete-all' onClick={handleDeleteAll}> <FaTrash /> <span>Delete All</span></button>}
        </div >
    );
}

export default TaskList;
