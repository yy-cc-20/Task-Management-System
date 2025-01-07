import React from 'react';
import './TaskManagement.css'

function TaskItem({task, onCompleted, onEdit, onDelete}) { 
    return (
                <tr>
            <td>{ task.title }</td>
            <td>{ task.description }</td>
            <td>{ task.isCompleted ? 'Completed' : 'In Progress' }</td>
            <td>{ new Date(task.createdAt).toLocaleDateString() }</td>
            <td>
              {task.isCompleted == false ? <button onClick={onCompleted}>Mark Completed</button> : null}
              <button className="icon-btn edit-icon" onClick={onEdit}></button>
              <button className="icon-btn delete-icon" onClick={onDelete}></button>
            </td>
                            </tr>
                    
    );
}

export default TaskItem;
