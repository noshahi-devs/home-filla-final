using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeFilla.Api.Data;
using HomeFilla.Api.Models;
using System.Globalization;

namespace HomeFilla.Api.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class StatsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StatsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public async Task<ActionResult<AdminStats>> GetAdminStats()
        {
            return new AdminStats
            {
                TotalProperties = await _context.Properties.CountAsync(),
                ActiveListings = await _context.Properties.CountAsync(p => p.Status == "approved"),
                PendingApproval = await _context.Properties.CountAsync(p => p.Status == "pending"),
                TotalUsers = await _context.Users.CountAsync(),
                TotalAgents = await _context.Users.CountAsync(u => u.Role == "agent"),
                TotalInquiries = await _context.Inquiries.CountAsync(),
                TotalRevenue = await _context.Payments.SumAsync(p => p.Amount)
            };
        }

        [HttpGet("properties-by-city")]
        public async Task<ActionResult<IEnumerable<CityStat>>> GetPropertiesByCity()
        {
            return await _context.Properties
                .GroupBy(p => p.City)
                .Select(g => new CityStat { City = g.Key, Count = g.Count() })
                .ToListAsync();
        }

        [HttpGet("recent-activity")]
        public async Task<ActionResult<IEnumerable<ActivityItem>>> GetRecentActivity()
        {
            var users = await _context.Users
                .OrderByDescending(u => u.CreatedAt)
                .Take(5)
                .Select(u => new ActivityItem { 
                    Type = "user", 
                    Title = "New user registered", 
                    Message = $"{u.Name} joined as {u.Role}",
                    CreatedAt = u.CreatedAt 
                })
                .ToListAsync();

            var properties = await _context.Properties
                .OrderByDescending(p => p.CreatedAt)
                .Take(5)
                .Select(p => new ActivityItem { 
                    Type = "property", 
                    Title = "New listing added", 
                    Message = $"{p.Title} in {p.City}",
                    CreatedAt = p.CreatedAt 
                })
                .ToListAsync();

            return users.Concat(properties)
                .OrderByDescending(a => a.CreatedAt)
                .Take(10)
                .ToList();
        }

        [HttpGet("monthly-growth")]
        public async Task<ActionResult<IEnumerable<MonthlyStat>>> GetMonthlyGrowth()
        {
            // Simple grouping by month for the last 6 months
            var sixMonthsAgo = DateTime.UtcNow.AddMonths(-6);
            var stats = await _context.Properties
                .Where(p => p.CreatedAt >= sixMonthsAgo)
                .ToListAsync();

            var growth = stats
                .GroupBy(p => p.CreatedAt.ToString("MMM"))
                .Select(g => new MonthlyStat { 
                    Month = g.Key, 
                    Count = g.Count() 
                })
                .ToList();

            return growth;
        }
    }

    public class AdminStats
    {
        public int TotalProperties { get; set; }
        public int ActiveListings { get; set; }
        public int PendingApproval { get; set; }
        public int TotalUsers { get; set; }
        public int TotalAgents { get; set; }
        public int TotalInquiries { get; set; }
        public decimal TotalRevenue { get; set; }
    }

    public class CityStat { public string City { get; set; } = string.Empty; public int Count { get; set; } }
    public class MonthlyStat { public string Month { get; set; } = string.Empty; public int Count { get; set; } }
    public class ActivityItem { 
        public string Type { get; set; } = string.Empty; 
        public string Title { get; set; } = string.Empty; 
        public string Message { get; set; } = string.Empty; 
        public DateTime CreatedAt { get; set; } 
    }
}
