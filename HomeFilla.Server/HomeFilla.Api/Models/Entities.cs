using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace HomeFilla.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required] public string Name { get; set; } = string.Empty;
        [Required] public string Email { get; set; } = string.Empty;
        [Required] public string PasswordHash { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Avatar { get; set; }
        [Required] public string Role { get; set; } = "buyer"; // admin, buyer, seller, agent
        [Required] public string Status { get; set; } = "active"; // active, blocked
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class Property
    {
        public int Id { get; set; }
        [Required] public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        [Required] public string City { get; set; } = string.Empty;
        [Required] public string Area { get; set; } = string.Empty;
        [Required] public string Type { get; set; } = "house"; // house, plot, apartment, commercial
        [Required] public string Purpose { get; set; } = "sale"; // sale, rent
        [Required] public string Status { get; set; } = "pending"; // pending, approved, rejected
        public int Beds { get; set; }
        public int Baths { get; set; }
        public int Sqft { get; set; }
        public double? Lat { get; set; }
        public double? Lng { get; set; }
        public int SellerId { get; set; }
        public int? AgentId { get; set; }
        public bool IsFeatured { get; set; }
        public int Views { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class City
    {
        public int Id { get; set; }
        [Required] public string Name { get; set; } = string.Empty;
        public string? Province { get; set; }
    }

    public class Area
    {
        public int Id { get; set; }
        public int CityId { get; set; }
        [Required] public string Name { get; set; } = string.Empty;
    }

    public class Inquiry
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        [Required] public string PropertyTitle { get; set; } = string.Empty;
        public int UserId { get; set; }
        [Required] public string UserName { get; set; } = string.Empty;
        public string? UserEmail { get; set; }
        public string? UserPhone { get; set; }
        [Required] public string Message { get; set; } = string.Empty;
        public string Status { get; set; } = "new"; // new, assigned, resolved
        public int? AssignedAgentId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
