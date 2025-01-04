using Task_Management_System.DataTransferObjects;
using Task_Management_System.Models;
using Task_Management_System.Repositories;

namespace Task_Management_System.Services;

public class TaskService
{
    private readonly ITaskRepository _taskRepository;

    public TaskService(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<List<TaskItem>> GetTasksAsync()
    {
        return await _taskRepository.GetTasksAsync();
    }

    public async Task<TaskItem> GetTaskByIdAsync(int id)
    {
        return await _taskRepository.GetTaskByIdAsync(id);
    }

    public async Task<int> AddTaskAsync(TaskDTO.CreateTaskRequest request)
    {
        TaskItem newTask = new TaskItem()
        {
            Title = request.Title,
            Description = request.Description,
            CreatedAt = DateTime.Now,
        };
        return await _taskRepository.AddTaskAsync(newTask);
    }

    public async Task UpdateTaskAsync(int id, TaskDTO.UpdateTaskRequest request)
    {
        TaskItem updatedTask = await GetTaskByIdAsync(id);
        updatedTask.Title = request.Title;
        updatedTask.Description = request.Description;
        updatedTask.IsCompleted = request.IsCompleted;
        await _taskRepository.UpdateTaskAsync(updatedTask);
    }

    public async Task DeleteTaskAsync(int id)
    {
        await _taskRepository.DeleteTaskAsync(id);
    }
}