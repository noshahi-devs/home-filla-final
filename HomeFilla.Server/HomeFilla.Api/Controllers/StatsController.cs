using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeFilla.Api.Data;
using HomeFilla.Api.Models;

namespace HomeFilla.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StatsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("dashboard")]
        public async Task<ActionResult<DashboardStats>> GetDashboardStats()
        {
            var stats = new DashboardStats
            {
                TotalProperties = await _context.Properties.CountAsync(),
                ApprovedProperties = await _context.Properties.CountAsync(p => p.Status == "approved"),
                PendingProperties = await _context.Properties.CountAsync(p => p.Status == "pending"),
                RejectedProperties = await _context.Properties.CountAsync(p => p.Status == "rejected"),
                
                TotalUsers = await _context.Users.CountAsync(),
                AgentsCount = await _context.Users.CountAsync(u => u.Role == "agent"),
                BuyersCount = await _context.Users.CountAsync(u => u.Role == "buyer"),
                
                TotalInquiries = await _context.Inquiries.CountAsync(),
                NewInquiries = await _context.Inquiries.CountAsync(i => i.Status == "new"),
                
                TotalRevenue = await _context.Payments.SumAsync(p => p.Amount),

                // Chart data: Properties by City
                PropertiesByCity = await _context.Properties
                    .GroupBy(p => p.City)
                    .Select(g => new ChartData { Label = g.Key, Value = g.Count() })
                    .ToListAsync(),

                // Recent listings
                RecentListings = await _context.Properties
                    .OrderByDescending(p => p.CreatedAt)
                    .Take(5)
                    .Select(p => new ListingSummary { Id = p.Id, Title = p.Title, Price = p.Price, Status = p.Status })
                    .ToListAsync()
            };

            return stats;
        }
    }

    public class DashboardStats
    {
        public int TotalProperties { get; set; }
        public int ApprovedProperties { get; set; }
        public int PendingProperties { get; set; }
        public int RejectedProperties { get; set; }
        public int TotalUsers { get; set; }
        public int AgentsCount { get; set; }
        public int BuyersCount { get; set; }
        public int TotalInquiries { get; set; }
        public int NewInquiries { get; set; }
        public decimal TotalRevenue { get; set; }
        public List<ChartData> PropertiesByCity { get; set; } = new();
        public List<ListingSummary> RecentListings { get; set; } = new();
    }

    public class ChartData { public string Label { get; set; } = string.Empty; public int Value { get; set; } }
    public class ListingSummary { public int Id { get; set; } public string Title { get; set; } = string.Empty; public decimal Price { get; set; } public string Status { get; set; } = string.Empty; }
}
