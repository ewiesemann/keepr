using Microsoft.AspNetCore.Mvc;
using Keepr.Repositories;
using Keepr.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace Keepr.Controllers
{
  [Route("api/[controller]")]
  public class VaultController : Controller
  {
    private readonly VaultRepository _db;
    public VaultController(VaultRepository repo)
    {
      _db = repo;  
    }

    [HttpPost]
    [Authorize]
    public Vault CreateVault([FromBody]Vault newVault)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newVault.AuthorId = user.Identity.Name;
        return _db.CreateVault(newVault);
      }
      return null;
    }

    //get Vault by id
    [HttpGet("{id}")]
    public Vault GetByVaultId(int id)
    {
      return _db.GetByVaultId(id);
    }

    [HttpGet("author/{id}")]
    public IEnumerable<Vault> GetByAuthorId(int id)
    {
      return _db.GetbyAuthorId(id);
    }

        [HttpPut("{id}")]
    [Authorize]
    public Vault EditVault(int id, [FromBody]Vault editVault)
    {
      if (ModelState.IsValid)
      {
       return _db.EditVault(id, editVault);
      }
      return null;
    }

    [HttpDelete("{id}")]
    [Authorize]
    public string DeleteVault(int id)
    {
      var user = HttpContext.User.Identity.Name;
      bool delete = _db.DeleteVault(id, user);
      if(delete) {
        return "Successfully Deleted!";
      }
      return "An Error Occurred!";
    }

  }
}