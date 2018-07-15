namespace Keepr.Models
{

    public class Tag
    {
        public int Id {get; set;}
        public string TagName {get; set;}
        public string AuthorId {get; set;}
        public int KeepId {get; set ;}
    }
}