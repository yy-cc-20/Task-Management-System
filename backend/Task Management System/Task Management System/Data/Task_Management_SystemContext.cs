using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Task_Management_System.Models;

namespace Task_Management_System.Data
{
    public class Task_Management_SystemContext : DbContext
    {
        public Task_Management_SystemContext (DbContextOptions<Task_Management_SystemContext> options)
            : base(options)
        {
        }

        public DbSet<Task_Management_System.Models.TaskItem> TaskItem { get; set; } = default!;
    }
}
