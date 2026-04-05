using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeFilla.Api.Data;
using HomeFilla.Api.Models;

namespace HomeFilla.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LocationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("cities")]
        public async Task<ActionResult<IEnumerable<City>>> GetCities()
        {
            return await _context.Cities.OrderBy(c => c.Name).ToListAsync();
        }

        [HttpGet("cities/{id}")]
        public async Task<ActionResult<City>> GetCity(int id)
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null) return NotFound();
            return city;
        }

        [HttpPost("cities")]
        public async Task<ActionResult<City>> PostCity([FromBody] CityInputModel input)
        {
            var city = new City { Name = input.Name, Province = input.Province };
            _context.Cities.Add(city);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCity), new { id = city.Id }, city);
        }

        [HttpPut("cities/{id}")]
        public async Task<IActionResult> PutCity(int id, [FromBody] CityInputModel input)
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null) return NotFound();
            city.Name = input.Name;
            city.Province = input.Province;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("cities/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null) return NotFound();
            _context.Cities.Remove(city);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("cities/{cityId}/areas")]
        public async Task<ActionResult<IEnumerable<Area>>> GetAreasByCity(int cityId)
        {
            return await _context.Areas.Where(a => a.CityId == cityId).OrderBy(a => a.Name).ToListAsync();
        }

        [HttpGet("areas")]
        public async Task<ActionResult<IEnumerable<Area>>> GetAreas()
        {
            return await _context.Areas.OrderBy(a => a.Name).ToListAsync();
        }

        [HttpPost("areas")]
        public async Task<ActionResult<Area>> PostArea([FromBody] AreaInputModel input)
        {
            if (!await _context.Cities.AnyAsync(c => c.Id == input.CityId))
            {
                return BadRequest("City not found");
            }
            var area = new Area { Name = input.Name, CityId = input.CityId };
            _context.Areas.Add(area);
            await _context.SaveChangesAsync();
            return Ok(area);
        }

        [HttpDelete("areas/{id}")]
        public async Task<IActionResult> DeleteArea(int id)
        {
            var area = await _context.Areas.FindAsync(id);
            if (area == null) return NotFound();
            _context.Areas.Remove(area);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    public class CityInputModel { public string Name { get; set; } = string.Empty; public string? Province { get; set; } }
    public class AreaInputModel { public string Name { get; set; } = string.Empty; public int CityId { get; set; } }
}
