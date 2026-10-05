using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiGestoria.Data;
using ApiGestoria.Models;

namespace ApiGestoria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CargaAutoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CargaAutoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CargaAuto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CargaAuto>>> GetProductos()
        {
            return await _context.CargaAutos.ToListAsync();
        }

        // GET: api/CargaAuto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CargaAuto>> GetCargaAuto(int id)
        {
            var cargaAuto = await _context.CargaAutos.FindAsync(id);

            if (cargaAuto == null)
            {
                return NotFound();
            }

            return cargaAuto;
        }

        // PUT: api/CargaAuto/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCargaAuto(int id, CargaAuto cargaAuto)
        {
            if (id != cargaAuto.CargaAutoId)
            {
                return BadRequest();
            }

            _context.Entry(cargaAuto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CargaAutoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CargaAuto
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CargaAuto>> PostCargaAuto(CargaAuto cargaAuto)
        {
            _context.CargaAutos.Add(cargaAuto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCargaAuto", new { id = cargaAuto.CargaAutoId }, cargaAuto);
        }

        // DELETE: api/CargaAuto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCargaAuto(int id)
        {
            var cargaAuto = await _context.CargaAutos.FindAsync(id);
            if (cargaAuto == null)
            {
                return NotFound();
            }

            _context.CargaAutos.Remove(cargaAuto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CargaAutoExists(int id)
        {
            return _context.CargaAutos.Any(e => e.CargaAutoId == id);
        }
    }
}
