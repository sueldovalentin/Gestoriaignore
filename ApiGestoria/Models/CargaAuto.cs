using System.ComponentModel.DataAnnotations;
namespace ApiGestoria.Models;
public class CargaAuto
{
    [Key]
    public int CargaAutoId { get; set; }
    public string? Marca { get; set; }
    public string? Modelo { get; set; }
    public int Anio { get; set; }
    public string? Patente { get; set; }
    public int Km { get; set; }
    public DateOnly FechaIngreso { get; set; }
    public Estado Disponible { get; set; }
    
}

public enum Estado
{
    Disponible,
    No_Disponible
}