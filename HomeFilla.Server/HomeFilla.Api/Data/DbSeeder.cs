using HomeFilla.Api.Models;
using HomeFilla.Api.Data;

namespace HomeFilla.Api.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            context.Database.EnsureCreated();

            if (!context.Users.Any(u => u.Role == "agent"))
            {
                var sampleAgents = new List<User>
                {
                    new User { Name = "Haris Ali", Email = "haris.agent@homefilla.com", Role = "agent", Status = "approved", AgencyName = "RE/MAX Elite", Rating = 4.8, PasswordHash = "agent123" },
                    new User { Name = "Aisha Khan", Email = "aisha.agent@homefilla.com", Role = "agent", Status = "approved", AgencyName = "Zameen Professionals", Rating = 4.5, PasswordHash = "agent123" },
                    new User { Name = "Bilal Ahmed", Email = "bilal.agent@homefilla.com", Role = "agent", Status = "pending", AgencyName = "Independent", Rating = 0.0, PasswordHash = "agent123" },
                    new User { Name = "Zainab Malik", Email = "zainab.agent@homefilla.com", Role = "agent", Status = "approved", AgencyName = "HomeFilla Luxury", Rating = 4.9, PasswordHash = "agent123" }
                };
                context.Users.AddRange(sampleAgents);
                context.SaveChanges();
            }

            if (!context.Properties.Any())
            {
                var properties = new List<Property>
                {
                    new Property { Title = "Luxury Villa in DHA Phase 6", Price = 45000000, City = "Lahore", Area = "DHA Phase 6", Type = "house", Status = "approved", SellerId = 2, Beds = 5, Baths = 4, Sqft = 4500, IsFeatured = true },
                    new Property { Title = "Modern Apartment in Bahria Town", Price = 18000000, City = "Lahore", Area = "Bahria Town", Type = "apartment", Status = "approved", SellerId = 2, Beds = 3, Baths = 2, Sqft = 1800 },
                    new Property { Title = "Penthouse in F-7 Islamabad", Price = 85000000, City = "Islamabad", Area = "F-7", Type = "apartment", Status = "approved", SellerId = 2, Beds = 4, Baths = 3, Sqft = 3200, IsFeatured = true }
                };
                context.Properties.AddRange(properties);
                context.SaveChanges();
            }
        }
    }
}
