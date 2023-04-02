using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using WAD.Back._14952.Models;
using WAD.Back._14952.Types;

namespace WAD.Back._14952.Repositories
{
    public class BookRepository: IBookRepository
    {
        // Privately connecting db context
        private readonly LibraryContext _libraryContext;
        public BookRepository(LibraryContext libraryContext)
        {
            _libraryContext = libraryContext;
        }

        // Get All Books
        public IEnumerable<Book> GetBooks() 
        {
            return _libraryContext.Books.Include(b => b.Author).ToList();
        }

        // Get Book w/ ID
        public ResponseResult<Book> GetBookById(int BookId)
        {
            var book = _libraryContext.Books.Find(BookId);

            // Handling Not Found Error
            if (book == null)
            {
                // Book not found
                return new ResponseResult<Book>
                {
                    Success = false,
                    ErrorMessage = $"Book with ID {BookId} not found.",
                    StatusCode = 404
                };
            }

            // Prepopulating Author Field on Books
            _libraryContext.Entry(book).Reference(b => b.Author).Load();
            return new ResponseResult<Book>
            {
                Success = true,
                StatusCode = 201,
                Payload = book
            };    
        }

        // Create Book
        public ResponseResult<Book> CreateBook(Book book) 
        {
            // Handling if book which was sent through body is empty
            if (book == null)
            {
                // Book not found
                return new ResponseResult<Book>
                {
                    Success = false,
                    ErrorMessage = $"Book with ID {book.Id} not found.",
                    StatusCode = 404
                };
            }

            // Handling if connecting fake (not-existing) author to book
            var author = _libraryContext.Authors.Find(book.Author.Id);
            if (author == null)
            {
                // Author not found
                return new ResponseResult<Book>
                {
                    Success = false,
                    ErrorMessage = $"Author with ID {book.Author.Id} not found.",
                    StatusCode = 404
                };
            }

            // Prepopulating Author Field on Books
            book.Author = _libraryContext.Authors.Find(book.Author.Id);
            _libraryContext.Add(book);
            SaveDB();

            return new ResponseResult<Book>
            {
                Success = true,
                StatusCode = 201,
                Payload = book
            };
        }

        // Update Book
        public ResponseResult<Book> UpdateBook(Book book)
        {
            // Handling if book which was sent through body is empty
            if (book == null)
            {
                // Book not found
                return new ResponseResult<Book>
                {
                    Success = false,
                    ErrorMessage = $"Book with ID {book.Id} not found.",
                    StatusCode = 404
                };
            }

            _libraryContext.Update(book);
            SaveDB();

            return new ResponseResult<Book>
            {
                Success = true,
                StatusCode = 202,
                Payload = book
            };
        }

        // Delete Book
        public ResponseResult<Book> DeleteBook(int BookId)
        {
            // Handling if book with id does not exist
            var book = _libraryContext.Books.Find(BookId);
            if (book == null)
            {
                // Book not found
                return new ResponseResult<Book>
                {
                    Success = false,
                    ErrorMessage = $"Book with ID {BookId} not found.",
                    StatusCode = 404
                };
            }

            _libraryContext.Remove(book);
            SaveDB();

            return new ResponseResult<Book>
            {
                Success = true,
                StatusCode = 204
            };
        }

        // Helper Function to not repeat myself
        public void SaveDB()
        {
            _libraryContext.SaveChanges();
        }
    }
}
