using Microsoft.EntityFrameworkCore;
using WAD.Back._14952.Models;

namespace WAD.Back._14952
{
    public class LibraryContext: DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> o): base(o)
        {
            Database.EnsureCreated();
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; } 
    }
}
