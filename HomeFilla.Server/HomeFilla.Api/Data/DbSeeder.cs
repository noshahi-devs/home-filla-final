using HomeFilla.Api.Models;
using HomeFilla.Api.Data;

namespace HomeFilla.Api.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            context.Database.EnsureCreated();

            if (!context.Users.Any())
            {
                var users = new List<User>
                {
                    new User { Id = 1, Name = "Admin User", Email = "admin@homefilla.com", PasswordHash = "admin123", Role = "admin", Status = "active" },
                    new User { Id = 2, Name = "Ali Hassan", Email = "ali.seller@gmail.com", Role = "seller", Status = "active" },
                    new User { Id = 3, Name = "Sara Ahmed", Email = "sara.seller@gmail.com", Role = "seller", Status = "active" },
                    new User { Id = 4, Name = "Usman Khan", Email = "usman.seller@gmail.com", Role = "seller", Status = "active" }
                };
                context.Users.AddRange(users);
                context.SaveChanges();
            }

            if (!context.Properties.Any())
            {
                var properties = new List<Property>
                {
                    new Property { Title = "Luxury Villa in DHA Phase 6", Price = 45000000, City = "Lahore", Area = "DHA Phase 6", Type = "house", Status = "approved", SellerId = 2, Beds = 5, Baths = 4, Sqft = 4500, IsFeatured = true },
                    new Property { Title = "Modern Apartment in Bahria Town", Price = 18000000, City = "Lahore", Area = "Bahria Town", Type = "apartment", Status = "approved", SellerId = 3, Beds = 3, Baths = 2, Sqft = 1800 },
                    new Property { Title = "Penthouse in F-7 Islamabad", Price = 85000000, City = "Islamabad", Area = "F-7", Type = "apartment", Status = "approved", SellerId = 4, Beds = 4, Baths = 3, Sqft = 3200, IsFeatured = true }
                };
                context.Properties.AddRange(properties);
                context.SaveChanges();
            }
        }
    }
}
