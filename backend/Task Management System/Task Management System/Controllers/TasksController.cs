using Microsoft.AspNetCore.Mvc;
using Task_Management_System.Data;
using Task_Management_System.DataTransferObjects;
using Task_Management_System.Models;
using Task_Management_System.Repositories;
using Task_Management_System.Services;

namespace Task_Management_System.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly TaskService _taskService;

    public TasksController(Task_Management_SystemContext context)
    {
        _taskService = new TaskService(new TaskRepository(context));
    }

    // GET: api/Tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
    {
        return Ok(await _taskService.GetTasksAsync());
    }

    // GET: api/Tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItem>> GetTask(int id)
    {
        try
        {
            return Ok(await _taskService.GetTaskByIdAsync(id));
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    // PUT: api/Tasks/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTask(int id, [FromBody] TaskDTO.UpdateTaskRequest request)
    {
        if (request == null)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        try
        {
            await _taskService.UpdateTaskAsync(id, request);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    // POST: api/Tasks
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<TaskItem>> PostTask(TaskDTO.CreateTaskRequest request)
    {
        if (request == null)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        try
        {
            int id = await _taskService.AddTaskAsync(request);
            return CreatedAtAction("GetTask", new { id = id }, request);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    // DELETE: api/Tasks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        try
        {
            await _taskService.DeleteTaskAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound();
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
