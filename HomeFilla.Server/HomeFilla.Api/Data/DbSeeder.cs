using HomeFilla.Api.Models;
using HomeFilla.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace HomeFilla.Api.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            context.Database.Migrate();

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

            if (!context.Payments.Any())
            {
                var payments = new List<Payment>
                {
                    new Payment { UserId = 2, UserName = "Arslan Malik", Amount = 5000, Purpose = "Pro Agent Subscription", Status = "completed", CreatedAt = DateTime.UtcNow.AddDays(-2) },
                    new Payment { UserId = 2, UserName = "Arslan Malik", Amount = 1500, Purpose = "Featured Listing Fee (ID: 1)", Status = "completed", CreatedAt = DateTime.UtcNow.AddDays(-5) },
                    new Payment { UserId = 3, UserName = "Zoya Sheikh", Amount = 15000, Purpose = "Agency Prime Plan", Status = "completed", CreatedAt = DateTime.UtcNow.AddHours(-12) },
                    new Payment { UserId = 4, UserName = "Kamran Shah", Amount = 5000, Purpose = "Pro Agent Subscription", Status = "pending", CreatedAt = DateTime.UtcNow }
                };
                context.Payments.AddRange(payments);
                context.SaveChanges();
            }

            if (!context.Notifications.Any())
            {
                var notifications = new List<Notification>
                {
                    new Notification { 
                        UserId = 1, 
                        Title = "Welcome to Home Filla!", 
                        Message = "Your admin account is setup. You can now manage properties and agents.", 
                        Icon = "fas fa-shield-alt", 
                        Color = "#4a6cf7", 
                        IsRead = false, 
                        CreatedAt = DateTime.UtcNow.AddDays(-1) 
                    },
                    new Notification { 
                        UserId = 2, 
                        Title = "New Inquiry Received", 
                        Message = "A potential buyer has asked about 'Luxury Villa in DHA'. Check your inquiries.", 
                        Icon = "fas fa-envelope", 
                        Color = "#22c55e", 
                        IsRead = false, 
                        CreatedAt = DateTime.UtcNow.AddHours(-2) 
                    },
                    new Notification { 
                        UserId = 2, 
                        Title = "Payment Successful", 
                        Message = "Your Pro Agent Subscription fee of Rs 5,000 has been received.", 
                        Icon = "fas fa-check-circle", 
                        Color = "#7c3aff", 
                        IsRead = true, 
                        CreatedAt = DateTime.UtcNow.AddDays(-2) 
                    },
                    new Notification { 
                        UserId = 3, 
                        Title = "Plan Upgraded!", 
                        Message = "Welcome to Agency Prime. You now have unlimited listings capacity.", 
                        Icon = "fas fa-rocket", 
                        Color = "#f59e0b", 
                        IsRead = false, 
                        CreatedAt = DateTime.UtcNow.AddHours(-5) 
                    }
                };
                context.Notifications.AddRange(notifications);
                context.SaveChanges();
            }

            if (!context.Settings.Any())
            {
                var settings = new List<SystemSetting>
                {
                    new SystemSetting { Key = "WebsiteName", Value = "Home Filla", Description = "The name displayed across the platform." },
                    new SystemSetting { Key = "ContactEmail", Value = "support@homefilla.com", Description = "Primary support email." },
                    new SystemSetting { Key = "ContactPhone", Value = "+92 300 1234567", Description = "Primary contact number." },
                    new SystemSetting { Key = "Address", Value = "Phase 5, DHA, Lahore, Pakistan", Description = "Company headquarters address." },
                    new SystemSetting { Key = "FacebookUrl", Value = "https://facebook.com/homefilla", Description = "Official Facebook page." },
                    new SystemSetting { Key = "TwitterUrl", Value = "https://twitter.com/homefilla", Description = "Official Twitter profile." },
                    new SystemSetting { Key = "InstagramUrl", Value = "https://instagram.com/homefilla", Description = "Official Instagram profile." }
                };
                context.Settings.AddRange(settings);
                context.SaveChanges();
            }
        }
    }
}
