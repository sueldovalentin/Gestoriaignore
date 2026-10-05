using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiGestoria.Migrations
{
    /// <inheritdoc />
    public partial class Actualizacion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Productos",
                table: "Productos");

            migrationBuilder.RenameTable(
                name: "Productos",
                newName: "CargaAutos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CargaAutos",
                table: "CargaAutos",
                column: "CargaAutoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_CargaAutos",
                table: "CargaAutos");

            migrationBuilder.RenameTable(
                name: "CargaAutos",
                newName: "Productos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Productos",
                table: "Productos",
                column: "CargaAutoId");
        }
    }
}
