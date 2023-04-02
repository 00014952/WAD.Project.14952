using System.Collections.Generic;
using WAD.Back._14952.Models;

namespace WAD.Back._14952.Types
{
    public interface IBookRepository
    {
        IEnumerable<Book> GetBooks();
        ResponseResult<Book> GetBookById(int BookId);
        ResponseResult<Book> CreateBook(Book book);
        ResponseResult<Book> UpdateBook(Book book);
        ResponseResult<Book> DeleteBook(int BookId);
    }
}
