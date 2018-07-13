using System.Collections.Generic;
using Keepr.Models;
using Keepr.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keepr.Controllers
{
    [Route("api/[controller]")]
    public class KeepController : Controller
    {
        private readonly KeepRepository _db;
        public KeepController(KeepRepository repo)
        {
            _db = repo;
        }

        [HttpGet]
        public IEnumerable<Keep> GetAll()
        {
            return _db.GetAll();
        }

        [HttpGet("{id}")]
        public Keep GetById(int id)
        {
            return _db.GetbyKeepId(id);
        }

        [HttpGet("vault/{id}")]
        [Authorize]
        public IEnumerable<Keep> GetByVaultId(int id)
        {
            return _db.GetByVaultId(id);
        }

        [HttpGet("user/{id}")]
        [Authorize]
        public IEnumerable<Keep> GetByAuthorId(string id)
        {
            return _db.GetByAuthorId(id);
        }

        [HttpPost("{id}")]
        [Authorize]
        public Keep CreateKeep(int id, [FromBody]Keep newKeep)
        {
            newKeep.AuthorId = HttpContext.User.Identity.Name;
            newKeep.VaultId = id;
            if (ModelState.IsValid)
            {
                return _db.CreateKeep(newKeep);
            }
            return null;
        }

        [HttpPut("{id}")]
        [Authorize]
        public Keep EditKeep(int id, [FromBody]Keep editKeep)
        {
            if (ModelState.IsValid)
            {
                var user = HttpContext.User.Identity.Name;
                return _db.EditKeep(id, editKeep, user);
            }
            return null;
        }

        [HttpDelete("{id}")]
        [Authorize]
        public string DeleteKeep(int id)
        {
            var user = HttpContext.User.Identity.Name;
            bool delete = _db.DeleteKeep(id, user);
            if (delete)
            {
                return "This Has Been Successfully Deleted!";
            }
            return "Error Occurred!";
        }
    }
}

