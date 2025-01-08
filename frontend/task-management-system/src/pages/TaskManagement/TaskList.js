import React, { useState, useEffect } from 'react';
import ApiService from '../../services/Api';
import './TaskManagement.css'
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

function TaskList() { 
    const apiService = new ApiService();
    const [taskList, setTaskList] = useState([]);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [task, setTask] = useState(null);

    useEffect(() => {
        fetchTask();
    }, []);
    
    const fetchTask = async () => {
        try {
            const response = await apiService.getTasks()
            setTaskList({
                taskList: response
            });
        } catch (error) {
            // console.error('Error fetching task:', error);
        }
    };

      const deleteTask = async(id) => {
        await apiService.deleteTask(id)
        await fetchTask();
        alert("Task is deleted.");
      }
    
      const completeTask = async(task) => {
        await apiService.completeTask(task)
        await fetchTask();
        alert("Task is completed.");
      }

      const openCreateEditDialog = (task) => {
        setTask(task);
        setShowTaskForm(true);
      }

      const saveTask = async(input) => {
        const addOrEdit = task == undefined ? 'add' : 'edit';
        setShowTaskForm(false);
        if (addOrEdit == 'add') {
            
            await apiService.createTask(input);
            alert("Timesheet is created.");
        }
        else {
            await apiService.updateTask(task.id, input)
            alert("Timesheet is updated.");
        }
            fetchTask();
      }

    return (
        <div>
            {taskList.taskList ? ( 
                <div className="timesheet-container">
                    <button className="action-btn" onClick={() => openCreateEditDialog(null)}>Create Task</button>
                    { taskList.taskList.length == 0 ? 
(<div style={{padding: 5 + 'px'}}>
    <p>No task. Create one.</p>
</div>) :
<div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Is completed</th>
                            <th>Created at</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        { 
                            taskList.taskList.map(task => 
                                
<TaskItem 
                                        key={task.id}
                                        task={task} 
                                        onCompleted={() => completeTask(task)}
                                        onEdit={() => openCreateEditDialog(task)}
                                        onDelete={() => deleteTask(task.id)}
                                    ></TaskItem>
                              
                            )
                        }
                        </tbody>
                    </table>      
                    </div>
}
                    <TaskForm 
                    isOpen={showTaskForm}
                    onClose={() => {setShowTaskForm(false)}}
                    onSave={(input) => saveTask(input)}
                    task={task}
                    ></TaskForm>
                </div>              
            ) : (
                <p>Loading task...</p>
            )}
        </div>
    );
}

export default TaskList;
