using Microsoft.EntityFrameworkCore;
using ApiGestoria.Models;

namespace ApiGestoria.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<CargaAuto> CargaAutos { get; set; }
}
