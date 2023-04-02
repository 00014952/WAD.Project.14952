using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using WAD.Back._14952.Models;
using WAD.Back._14952.Types;

namespace WAD.Back._14952.Repositories
{
    public class AuthorRepository: IAuthorRepository
    {
        // Privately connecting db context
        private readonly LibraryContext _libraryContext;
        public AuthorRepository(LibraryContext libraryContext)
        {
            _libraryContext = libraryContext;
        }

        // Get All Authors
        public IEnumerable<Author> GetAuthors()
        {
            return _libraryContext.Authors.ToList();
        }

        // Get Author w/ ID
        public ResponseResult<Author> GetAuthorById(int AuthorId)
        {
            var author = _libraryContext.Authors.Find(AuthorId);

            // Handling Not Found Error
            if (author == null)
            {
                return new ResponseResult<Author>
                {
                    Success = false,
                    ErrorMessage = $"Author with ID {AuthorId} not found."
                };
            }

            return new ResponseResult<Author>
            {
                Success = true,
                StatusCode = 200,
                Payload = author
            };
        }

        // Create Author
        public ResponseResult<Author> CreateAuthor(Author author)
        {
            // Handling if author which was sent through body is empty
            if (author == null)
            {
                return new ResponseResult<Author>
                {
                    Success = false,
                    ErrorMessage = "The body is empty",
                    StatusCode = 400
                };
            }

            _libraryContext.Add(author);
            SaveDB();

            return new ResponseResult<Author>
            {
                Success = true,
                StatusCode = 201,
                Payload = author
            };
        }

        // Update Author
        public ResponseResult<Author> UpdateAuthor(Author author)
        {
            _libraryContext.Update(author);
            SaveDB();
            return new ResponseResult<Author>
            { 
                Success = true, 
                StatusCode = 202,
                Payload = author
                
            };
        }

        // Delete Author
        public ResponseResult<Author> DeleteAuthor(int AuthorId)
        {
            var author = _libraryContext.Authors.Find(AuthorId);
            if (author == null)
            {
                // Author not found
                return new ResponseResult<Author>
                {
                    Success = false,
                    ErrorMessage = $"Author with ID {AuthorId} not found.",
                    StatusCode = 404
                };
            }
            
            var books = _libraryContext.Books.Where(b => b.Author.Id == AuthorId);
            if(books.Any())
            {
                // Books associated with author exist
                return new ResponseResult<Author>
                {
                    Success = false,
                    ErrorMessage = $"Cannot delete author with ID {AuthorId} because books associated with the author exist.",
                    StatusCode = 400
                };
            }

            _libraryContext.Remove(author);
            SaveDB();
            return new ResponseResult<Author>
            {
                Success = true,
                StatusCode = 204,
            };
        }

        public IEnumerable<Book> GetAuthorBooks(int AuthorId)
        {
            var books = _libraryContext.Books.Where(b => b.Author.Id == AuthorId).ToList();

            return books;
        }

        // Helper Function to not repeat myself
        public void SaveDB()
        {
            _libraryContext.SaveChanges();
        }
    }
}
