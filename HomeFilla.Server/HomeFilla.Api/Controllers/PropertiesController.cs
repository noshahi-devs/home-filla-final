using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HomeFilla.Api.Data;
using HomeFilla.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace HomeFilla.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PropertiesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Property>>> GetProperties()
        {
            return await _context.Properties.Include(p => p.Images).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Property>> GetProperty(int id)
        {
            var property = await _context.Properties.Include(p => p.Images).FirstOrDefaultAsync(p => p.Id == id);
            if (property == null) return NotFound();
            return property;
        }

        [HttpPost]
        public async Task<ActionResult<Property>> PostProperty([FromForm] PropertyInputModel input)
        {
            var property = new Property
            {
                Title = input.Title,
                Description = input.Description,
                Price = input.Price,
                City = input.City,
                Area = input.Area,
                Type = input.Type,
                Purpose = input.Purpose,
                Beds = input.Beds,
                Baths = input.Baths,
                Sqft = input.Sqft,
                SellerId = input.SellerId,
                Status = "pending",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            if (input.ImageFiles != null && input.ImageFiles.Count > 0)
            {
                var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "properties");
                if (!Directory.Exists(uploadsDir))
                    Directory.CreateDirectory(uploadsDir);

                foreach (var file in input.ImageFiles)
                {
                    if (file.Length > 0)
                    {
                        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                        var filePath = Path.Combine(uploadsDir, fileName);
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }
                        var url = $"/uploads/properties/{fileName}";
                        property.Images.Add(new PropertyImage { ImageUrl = url });
                    }
                }
            }
            else if (input.Images != null) // Fallback for base64
            {
                foreach (var imgUrl in input.Images)
                {
                    property.Images.Add(new PropertyImage { ImageUrl = imgUrl });
                }
            }
            
            _context.Properties.Add(property);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProperty), new { id = property.Id }, property);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProperty(int id, [FromForm] PropertyInputModel input)
        {
            var property = await _context.Properties.Include(p => p.Images).FirstOrDefaultAsync(p => p.Id == id);
            if (property == null) return NotFound();

            property.Title = input.Title;
            property.Description = input.Description;
            property.Price = input.Price;
            property.City = input.City;
            property.Area = input.Area;
            property.Type = input.Type;
            property.Purpose = input.Purpose;
            property.Beds = input.Beds;
            property.Baths = input.Baths;
            property.Sqft = input.Sqft;
            property.UpdatedAt = DateTime.UtcNow;

            // Update images if new ones are provided
            if ((input.ImageFiles != null && input.ImageFiles.Count > 0) || (input.Images != null && input.Images.Count > 0))
            {
                _context.PropertyImages.RemoveRange(property.Images);
                
                if (input.ImageFiles != null && input.ImageFiles.Count > 0)
                {
                    var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "properties");
                    if (!Directory.Exists(uploadsDir)) Directory.CreateDirectory(uploadsDir);

                    foreach (var file in input.ImageFiles)
                    {
                        if (file.Length > 0)
                        {
                            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                            var filePath = Path.Combine(uploadsDir, fileName);
                            using (var stream = new FileStream(filePath, FileMode.Create))
                            {
                                await file.CopyToAsync(stream);
                            }
                            var url = $"/uploads/properties/{fileName}";
                            property.Images.Add(new PropertyImage { ImageUrl = url });
                        }
                    }
                }
                else if (input.Images != null)
                {
                    foreach (var imgUrl in input.Images)
                    {
                        property.Images.Add(new PropertyImage { ImageUrl = imgUrl });
                    }
                }
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            var property = await _context.Properties.FindAsync(id);
            if (property == null) return NotFound();

            property.Status = status;
            property.UpdatedAt = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            var property = await _context.Properties.FindAsync(id);
            if (property == null) return NotFound();

            _context.Properties.Remove(property);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class PropertyInputModel
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string City { get; set; } = string.Empty;
        public string Area { get; set; } = string.Empty;
        public string Type { get; set; } = "house";
        public string Purpose { get; set; } = "sale";
        public int Beds { get; set; }
        public int Baths { get; set; }
        public int Sqft { get; set; }
        public int SellerId { get; set; }
        public List<string>? Images { get; set; } // Legacy fallback
        public List<IFormFile>? ImageFiles { get; set; } // New physical files
    }
}
