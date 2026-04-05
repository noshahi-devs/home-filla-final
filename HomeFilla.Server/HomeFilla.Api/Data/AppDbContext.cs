using Microsoft.EntityFrameworkCore;
using HomeFilla.Api.Models;

namespace HomeFilla.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Inquiry> Inquiries { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<PropertyImage> PropertyImages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Further configuration can go here (e.g., Fluent API)
            modelBuilder.Entity<Property>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);
        }
    }
}
