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
                INSERT INTO vaults (name, description, authorId)
                VALUES (@Name, @Description, @AuthorId);
                SELECT LAST_INSERT_ID();
            ", vaultkeep);
            vaultkeep.Id = id;
            return vaultkeep;
        }

        public IEnumerable<VaultKeep> GetbyAuthorId(int id)
        {
            return _db.Query<VaultKeep>("SELECT * FROM vaults WHERE authorId = @id;", new { id });
        }

        public VaultKeep EditVaultKeep(int id, VaultKeep edit)
        {
            edit.Id = id;
            var i = _db.Execute(@"
                UPDATE vaults SET
                    name = @Name,
                    description = @Description
                WHERE id = @Id
                AND authorId = @AuthorId;
            ", edit);
            if (i > 0)
            {
                return edit;
            }
            return null;
        }
        // Delete
        public bool DeleteVaultKeep(int id, string authorId)
        {
            var i = _db.Execute(@"
      DELETE FROM vaults
      WHERE id = @id
      AND authorId = @authorId
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
