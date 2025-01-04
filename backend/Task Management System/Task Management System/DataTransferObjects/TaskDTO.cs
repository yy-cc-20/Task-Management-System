using System.ComponentModel.DataAnnotations;

namespace Task_Management_System.DataTransferObjects;

public class TaskDTO
{
    public class CreateTaskRequest
    {
        [Required]
        public string Title { get; set; }
        public string? Description { get; set; }
    }

    public class UpdateTaskRequest
    {
        [Required]
        public string Title { get; set; }
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}
