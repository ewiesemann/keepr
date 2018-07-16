using System.Collections.Generic;
using Keepr.Models;
using Keepr.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keepr.Controllers
{
  [Route("api/[controller]")]
  public class VaultKeepController : Controller
  {
    private readonly VaultKeepRepository _db;
    public VaultKeepController(VaultKeepRepository repo)
    {
      _db = repo;  
    }

    [HttpPost]
    [Authorize]
    public VaultKeep CreateVaultKeep([FromBody]VaultKeep newVaultKeep)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newVaultKeep.AuthorId = user.Identity.Name;
        return _db.CreateVaultKeep(newVaultKeep);
      }
      return null;
    }

    [HttpGet("author/{id}")]
    public IEnumerable<VaultKeep> GetByAuthorId(int id)
    {
      return _db.GetbyAuthorId(id);
    }

      [HttpPut("{id}")]
    [Authorize]
    public Vault EditVaultKeep(int id, [FromBody]VaultKeep editVaultKeep)
    {
      if (ModelState.IsValid)
      {
       return _db.EditVaultKeep(id, editVaultKeep);
      }
      return null;
    }

    [HttpDelete("{id}")]
    [Authorize]
    public string DeleteVaultKeep(int id)
    {
      var user = HttpContext.User.Identity.Name;
      bool delete = _db.DeleteVaultKeep(id, user);
      if(delete) {
        return "Successfully Deleted!";
      }
      return "An Error Occurred!";
    }

  }
}