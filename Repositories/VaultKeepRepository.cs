using System.Collections.Generic;
using System.Data;
using Keepr.Repositories;
using Keepr.Models;
using Dapper;
using System;

namespace Keepr.Repositories
{
    public class VaultKeepRepository : DbContext
    {
        public VaultKeepRepository(IDbConnection db) : base(db)
        {

        }

        public VaultKeep CreateVaultKeep(VaultKeep vaultkeep)
        {
            int id = _db.ExecuteScalar<int>(@"
                INSERT INTO vaultkeeps (vaultId, keepId, authorId)
                VALUES (@VaultId, @KeepId, @AuthorId);
                SELECT LAST_INSERT_ID();
            ", vaultkeep);
            vaultkeep.Id = id;
            return vaultkeep;
        }

        public IEnumerable<Keep> GetKeepsInVault(int vaultId)
        {
            return _db.Query<Keep>("SELECT * FROM vaultkeeps vk INNER JOIN keeps k ON k.id = vk.keepId WHERE (vaultId = @vaultId)", new { vaultId });
        }

        // Delete
        public bool DeleteVaultKeep(int id, string authorId)
        {
            var i = _db.Execute(@"
      DELETE FROM vaultkeep
      WHERE id = @id
      LIMIT 1;
      ", new { id });
            if (i > 0)
            {
                return true;
            }
            return false;
        }
    }
}
