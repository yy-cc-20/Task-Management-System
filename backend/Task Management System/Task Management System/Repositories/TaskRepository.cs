using Microsoft.EntityFrameworkCore;
using Task_Management_System.Data;
using Task_Management_System.Models;

namespace Task_Management_System.Repositories;

public interface ITaskRepository
{
    Task<List<TaskItem>> GetTasksAsync();
    Task<TaskItem> GetTaskByIdAsync(int id);
    Task<int> AddTaskAsync(TaskItem task);
    Task UpdateTaskAsync(TaskItem task);
    Task DeleteTaskAsync(int id);
}

public class TaskRepository : ITaskRepository
{
    private readonly Task_Management_SystemContext _context;

    public TaskRepository(Task_Management_SystemContext context)
    {
        _context = context;
    }

    public async Task<List<TaskItem>> GetTasksAsync()
    {
        return await _context.TaskItem.ToListAsync();
    }

    public async Task<TaskItem> GetTaskByIdAsync(int id)
    {
        var taskItem = await _context.TaskItem.FindAsync(id);

        if (taskItem == null)
        {
            throw new KeyNotFoundException($"Task with ID {id} not found.");
        }

        return taskItem;
    }

    public async Task<int> AddTaskAsync(TaskItem task)
    {
        _context.TaskItem.Add(task);
        await _context.SaveChangesAsync();
        return task.Id;
    }

    public async Task UpdateTaskAsync(TaskItem task)
    {
        _context.TaskItem.Update(task);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteTaskAsync(int id)
    {
        var task = await GetTaskByIdAsync(id);
        _context.TaskItem.Remove(task);
        await _context.SaveChangesAsync();
    }
}