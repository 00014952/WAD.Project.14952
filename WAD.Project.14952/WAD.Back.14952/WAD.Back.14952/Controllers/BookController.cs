using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Transactions;
using WAD.Back._14952.Models;
using WAD.Back._14952.Types;

namespace WAD.Back._14952.Controllers
{
    [Route("/books")]
    [ApiController]
    public class BookController: ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        public BookController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet(Name = "Get Books")]
        public IActionResult Get()
        {
            var books = _bookRepository.GetBooks();
            return new OkObjectResult(new 
            {
                data = books, 
                StatusCode = 200, 
                total = books.Count()
            });
        }

        [HttpGet("{id}", Name = "Get Book By Id")]
        public IActionResult Get(int id) 
        {
            var result = _bookRepository.GetBookById(id);
            if (!result.Success)
            {
                return StatusCode(result.StatusCode, new
                {
                    message = result.ErrorMessage
                });
            }

            var response = new
            {
                data = result.Payload,
                StatusCode = 200
            };

            return new OkObjectResult(response);
        }

        [HttpPost(Name = "Create Book")]
        public IActionResult Post([FromBody] Book book)
        {
            using (var scope = new TransactionScope())
            {
                var result = _bookRepository.CreateBook(book);
                if (!result.Success)
                {
                    return StatusCode(result.StatusCode, new
                    {
                        message = result.ErrorMessage
                    });
                }

                scope.Complete();
                var response = new
                {
                    message = "Created!",
                    data = result.Payload,
                    StatusCode = result.StatusCode
                };

                return new OkObjectResult(response);
            }
        }

        [HttpPut("{id}", Name = "UpdateBook")]
        public IActionResult Put(Book book) 
        { 
            using ( var scope = new TransactionScope())
            {
                var result = _bookRepository.UpdateBook(book);
                if(!result.Success)
                {
                    return StatusCode(result.StatusCode, new
                    {
                        message = result.ErrorMessage
                    });
                }

                scope.Complete();
                var response = new
                {
                    message = "Updated!",
                    data = result.Payload,
                    StatusCode = result.StatusCode
                };

                return new OkObjectResult(response);

            }
        }

        [HttpDelete("{id}", Name = "DeleteBook")]
        public IActionResult Delete(int id)
        {
            var result = _bookRepository.DeleteBook(id);

            if(!result.Success)
            {
                return StatusCode(result.StatusCode, new
                {
                    message = result.ErrorMessage
                });
            }

            var response = new
            {
                message = "Deleted!",
                StatusCode = 204
            };

            return new OkObjectResult(response);
        }
    }
}
