using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeFilla.Api.Data;
using HomeFilla.Api.Models;

namespace HomeFilla.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InquiriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InquiriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Inquiry>>> GetInquiries()
        {
            return await _context.Inquiries.OrderByDescending(i => i.CreatedAt).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Inquiry>> PostInquiry([FromBody] Inquiry inquiry)
        {
            inquiry.CreatedAt = DateTime.UtcNow;
            _context.Inquiries.Add(inquiry);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetInquiries), new { id = inquiry.Id }, inquiry);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            var inquiry = await _context.Inquiries.FindAsync(id);
            if (inquiry == null) return NotFound();

            inquiry.Status = status;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInquiry(int id)
        {
            var inquiry = await _context.Inquiries.FindAsync(id);
            if (inquiry == null) return NotFound();

            _context.Inquiries.Remove(inquiry);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
