using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WAD.Back._14952.Models;

namespace WAD.Back._14952.Types
{
    public interface IAuthorRepository
    {
        IEnumerable<Author> GetAuthors();
        ResponseResult<Author> GetAuthorById(int AuthorId);
        ResponseResult<Author> CreateAuthor (Author author);
        ResponseResult<Author> UpdateAuthor (Author author);
        ResponseResult<Author> DeleteAuthor (int AuthorId);
        IEnumerable<Book> GetAuthorBooks(int AuthorId);
    }
}
