using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeFilla.Api.Data;
using HomeFilla.Api.Models;

namespace HomeFilla.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AgentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAgents()
        {
            var agents = await _context.Users
                .Where(u => u.Role == "agent")
                .Select(u => new {
                    id = u.Id,
                    userId = u.Id,
                    name = u.Name,
                    email = u.Email,
                    phone = u.Phone,
                    avatar = u.Avatar,
                    agencyName = u.AgencyName ?? "Independent",
                    listingsCount = _context.Properties.Count(p => p.AgentId == u.Id || p.SellerId == u.Id),
                    rating = u.Rating ?? 0.0,
                    status = u.Status,
                    createdAt = u.CreatedAt
                })
                .OrderByDescending(x => x.createdAt)
                .ToListAsync();

            return Ok(agents);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetAgent(int id)
        {
            var agent = await _context.Users
                .Where(u => u.Id == id && u.Role == "agent")
                .Select(u => new {
                    id = u.Id,
                    userId = u.Id,
                    name = u.Name,
                    email = u.Email,
                    phone = u.Phone,
                    avatar = u.Avatar,
                    agencyName = u.AgencyName ?? "Independent",
                    listingsCount = _context.Properties.Count(p => p.AgentId == u.Id || p.SellerId == u.Id),
                    rating = u.Rating ?? 0.0,
                    status = u.Status,
                    createdAt = u.CreatedAt
                })
                .FirstOrDefaultAsync();
                
            if (agent == null) return NotFound();
            return Ok(agent);
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostAgent([FromBody] AgentInputModel input)
        {
            if (await _context.Users.AnyAsync(u => u.Email == input.Email))
            {
                return BadRequest("Email already exists");
            }

            var agent = new User
            {
                Name = input.Name,
                Email = input.Email,
                PasswordHash = input.Password,
                Phone = input.Phone,
                Avatar = input.Avatar,
                AgencyName = input.AgencyName,
                Role = "agent",
                Status = "pending",
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(agent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAgent), new { id = agent.Id }, agent);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            var agent = await _context.Users.FirstOrDefaultAsync(u => u.Id == id && u.Role == "agent");
            if (agent == null) return NotFound();

            agent.Status = status;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgent(int id)
        {
            var agent = await _context.Users.FirstOrDefaultAsync(u => u.Id == id && u.Role == "agent");
            if (agent == null) return NotFound();

            _context.Users.Remove(agent);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    public class AgentInputModel
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Avatar { get; set; }
        public string? AgencyName { get; set; }
    }
}
