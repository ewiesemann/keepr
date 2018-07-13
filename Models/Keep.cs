namespace Keepr.Models
{

    public class Keep
    {
        public int Id { get; set; }
        public string Img { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AuthorId { get; set; }
        public int VaultId { get; internal set; }
    }



}