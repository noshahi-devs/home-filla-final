using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeFilla.Api.Data;
using HomeFilla.Api.Models;

namespace HomeFilla.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SettingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SystemSetting>>> GetSettings()
        {
            return await _context.Settings.ToListAsync();
        }

        [HttpGet("{key}")]
        public async Task<ActionResult<SystemSetting>> GetSetting(string key)
        {
            var setting = await _context.Settings.FirstOrDefaultAsync(s => s.Key == key);
            if (setting == null) return NotFound();
            return setting;
        }

        [HttpPost]
        public async Task<ActionResult<SystemSetting>> PostSetting([FromBody] SettingInputModel input)
        {
            var setting = await _context.Settings.FirstOrDefaultAsync(s => s.Key == input.Key);
            if (setting != null)
            {
                setting.Value = input.Value;
                setting.Description = input.Description;
            }
            else
            {
                setting = new SystemSetting
                {
                    Key = input.Key,
                    Value = input.Value,
                    Description = input.Description
                };
                _context.Settings.Add(setting);
            }

            await _context.SaveChangesAsync();
            return Ok(setting);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSetting(int id, [FromBody] SettingInputModel input)
        {
            var setting = await _context.Settings.FindAsync(id);
            if (setting == null) return NotFound();

            setting.Key = input.Key;
            setting.Value = input.Value;
            setting.Description = input.Description;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSetting(int id)
        {
            var setting = await _context.Settings.FindAsync(id);
            if (setting == null) return NotFound();

            _context.Settings.Remove(setting);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    public class SettingInputModel
    {
        public string Key { get; set; } = string.Empty;
        public string? Value { get; set; }
        public string? Description { get; set; }
    }
}
