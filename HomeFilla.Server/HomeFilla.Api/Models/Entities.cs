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

        // Navigation
        public ICollection<PropertyImage> Images { get; set; } = new List<PropertyImage>();
    }

    public class PropertyImage
    {
        public int Id { get; set; }
        public int PropertyId { get; set; }
        [Required] public string ImageUrl { get; set; } = string.Empty; // Supports Base64 or URL
    }

    public class Notification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [Required] public string Title { get; set; } = string.Empty;
        public string? Message { get; set; }
        public string? Icon { get; set; }
        public string? Color { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
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

    public class Category
    {
        public int Id { get; set; }
        [Required] public string Name { get; set; } = string.Empty; // e.g. House, Plot
        public string? Icon { get; set; }
        public int SortOrder { get; set; }
    }

    public class Payment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public decimal Amount { get; set; }
        [Required] public string Purpose { get; set; } = string.Empty; // e.g. Featured, Subscription
        public string Status { get; set; } = "completed"; // completed, pending
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class SystemSetting
    {
        public int Id { get; set; }
        [Required] public string Key { get; set; } = string.Empty;
        public string? Value { get; set; }
        public string? Description { get; set; }
    }
}
