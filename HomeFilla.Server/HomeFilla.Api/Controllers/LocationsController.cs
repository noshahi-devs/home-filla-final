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
        public async Task<IActionResult> GetCities()
        {
            var cities = await _context.Cities
                .OrderBy(c => c.Name)
                .Select(c => new {
                    c.Id, c.Name, c.Province, c.Lat, c.Lng,
                    PropertyCount = _context.Properties.Count(p => p.City == c.Name)
                })
                .ToListAsync();
            return Ok(cities);
        }

        [HttpGet("cities/{id}")]
        public async Task<ActionResult<City>> GetCity(int id)
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null) return NotFound();
            return city;
        }

        [HttpPost("cities")]
        public async Task<IActionResult> PostCity([FromBody] CityInputModel input)
        {
            if (await _context.Cities.AnyAsync(c => c.Name.ToLower() == input.Name.ToLower()))
                return BadRequest(new { message = "duplicate_city", error = "A city with this name already exists."});

            var city = new City { Name = input.Name, Province = input.Province, Lat = input.Lat, Lng = input.Lng };
            _context.Cities.Add(city);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCity), new { id = city.Id }, city);
        }

        [HttpPut("cities/{id}")]
        public async Task<IActionResult> PutCity(int id, [FromBody] CityInputModel input)
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null) return NotFound();

            if (city.Name.ToLower() != input.Name.ToLower() && 
                await _context.Cities.AnyAsync(c => c.Name.ToLower() == input.Name.ToLower()))
                return BadRequest(new { message = "duplicate_city", error = "A city with this name already exists."});

            city.Name = input.Name;
            city.Province = input.Province;
            city.Lat = input.Lat;
            city.Lng = input.Lng;
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
        public async Task<IActionResult> GetAreasByCity(int cityId)
        {
            var areas = await _context.Areas
                .Where(a => a.CityId == cityId)
                .OrderBy(a => a.Name)
                .Select(a => new {
                    a.Id, a.CityId, a.Name, a.Lat, a.Lng,
                    PropertyCount = _context.Properties.Count(p => p.Area == a.Name)
                })
                .ToListAsync();
            return Ok(areas);
        }

        [HttpGet("areas")]
        public async Task<ActionResult<IEnumerable<Area>>> GetAreas()
        {
            return await _context.Areas.OrderBy(a => a.Name).ToListAsync();
        }

        [HttpPost("areas")]
        public async Task<IActionResult> PostArea([FromBody] AreaInputModel input)
        {
            if (!await _context.Cities.AnyAsync(c => c.Id == input.CityId))
                return BadRequest(new { message = "city_not_found", error = "Associated city not found" });

            if (await _context.Areas.AnyAsync(a => a.CityId == input.CityId && a.Name.ToLower() == input.Name.ToLower()))
                return BadRequest(new { message = "duplicate_area", error = "An area with this name already exists in this city." });

            var area = new Area { Name = input.Name, CityId = input.CityId, Lat = input.Lat, Lng = input.Lng };
            _context.Areas.Add(area);
            await _context.SaveChangesAsync();
            return Ok(area);
        }

        [HttpPut("areas/{id}")]
        public async Task<IActionResult> PutArea(int id, [FromBody] AreaInputModel input)
        {
            var area = await _context.Areas.FindAsync(id);
            if (area == null) return NotFound();

            if (area.Name.ToLower() != input.Name.ToLower() && 
                await _context.Areas.AnyAsync(a => a.CityId == area.CityId && a.Name.ToLower() == input.Name.ToLower()))
                return BadRequest(new { message = "duplicate_area", error = "An area with this name already exists in this city." });

            area.Name = input.Name;
            area.Lat = input.Lat;
            area.Lng = input.Lng;
            await _context.SaveChangesAsync();
            return NoContent();
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

    public class CityInputModel { public string Name { get; set; } = string.Empty; public string? Province { get; set; } public double? Lat { get; set; } public double? Lng { get; set; } }
    public class AreaInputModel { public string Name { get; set; } = string.Empty; public int CityId { get; set; } public double? Lat { get; set; } public double? Lng { get; set; } }
}
