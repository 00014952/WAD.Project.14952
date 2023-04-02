namespace WAD.Back._14952.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Genre { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
        public Author Author { get; set; }
    }
}
