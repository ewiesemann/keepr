using System.Collections.Generic;
using System.Data;
using Keepr.Models;
using Dapper;
using MySql.Data.MySqlClient;
using System;

namespace Keepr.Repositories
{
    public class KeepRepository : DbContext
    {
        public KeepRepository(IDbConnection db) : base(db)
        {

        }

        public Keep CreateKeep(Keep newKeep)
        {
            int id = _db.ExecuteScalar<int>(@"
                INSERT INTO keeps (name, description, img, views, keeps, public, authorId)
                VALUES (@Name, @Description, @Img, @Views, @Keeps, @Public, @AuthorId);
                SELECT LAST_INSERT_ID();
            ", newKeep);
            newKeep.Id = id;
            return newKeep;
        }

        public IEnumerable<Keep> GetAll()
        {
            var keeps = _db.Query<Keep>("SELECT * FROM keeps;");
            return keeps;
        }

        internal IEnumerable<Keep> GetByVaultId(int id)
        {
            return _db.Query<Keep>("SELECT * FROM keeps WHERE vaultId = @id;", new { id });
        }

        internal IEnumerable<Keep> GetByAuthorId(string id)
        {
            return _db.Query<Keep>("SELECT * FROM keeps WHERE authorId = @id;", new { id });
        }

        // GetbyId
        public Keep GetbyKeepId(int id)
        {
            return _db.QueryFirstOrDefault<Keep>("SELECT * FROM keeps WHERE id = @id;", new { id });
        }
        // Edit

        internal Keep EditKeep(int id, Keep editKeep, string user)
        {
            editKeep.Id = id;
            editKeep.AuthorId = user;
            var i = _db.Execute(@"
                UPDATE keeps SET
                name = @Name, 
                description = @Description, 
                img = @Img, 
                views = @Views, 
                keeps = @Keeps, 
                public = @Public, 
                authorID = @AuthorId
                WHERE id = @Id
            ", editKeep);
            if (i > 0)
            {
                return editKeep;
            }
            return null;
        }

        internal bool DeleteKeep(int id, string user)
        {
            var i = _db.Execute(@"
      DELETE FROM keeps
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
