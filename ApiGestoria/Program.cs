// using ApiGestoria.Data;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.FileProviders;

// var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddDbContext<ApplicationDbContext>(options =>
//     options.UseSqlServer(
//         builder.Configuration.GetConnectionString("DefaultConnection")
//         ?? throw new InvalidOperationException(
//             "Connection string 'DefaultConnection' not found."
//         )
//     ));

// builder.Services.AddControllers();

// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// // Swagger
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// // Frontend
// app.UseDefaultFiles(new DefaultFilesOptions
// {
//     FileProvider = new PhysicalFileProvider(
//         Path.GetFullPath(
//             Path.Combine(Directory.GetCurrentDirectory(), "../GestoriaFront")
//         )
//     )
// });

// app.UseStaticFiles(new StaticFileOptions
// {
//     FileProvider = new PhysicalFileProvider(
//         Path.GetFullPath(
//             Path.Combine(Directory.GetCurrentDirectory(), "../GestoriaFront")
//         )
//     ),
//     RequestPath = ""
// });

// app.UseHttpsRedirection();

// app.UseAuthorization();

// app.MapControllers();

// app.Run();
using ApiGestoria.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException(
            "Connection string 'DefaultConnection' not found."
        )
    ));

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();