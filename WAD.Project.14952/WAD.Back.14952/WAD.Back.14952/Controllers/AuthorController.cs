using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Transactions;
using System.Xml.Linq;
using WAD.Back._14952.Models;
using WAD.Back._14952.Types;

namespace WAD.Back._14952.Controllers
{
    [Route("/authors")]
    [ApiController]
    public class AuthorController: ControllerBase
    {
        private readonly IAuthorRepository _authorRepository;
        public AuthorController(IAuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }

        [HttpGet(Name = "GetAuthors")]
        public IActionResult Get()
        {
            var authors = _authorRepository.GetAuthors();
            return new OkObjectResult(new
            {
                data = authors,
                StatusCode = 200,
                total = authors.Count()
            });
        }

        [HttpGet("{id}", Name = "GetAuthorById")]
        public IActionResult Get(int id)
        {
            var result = _authorRepository.GetAuthorById(id);

            // 404 if no book matched
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
                StatusCode = result.StatusCode,
            };

            return new OkObjectResult(response);
        }

        [HttpPost(Name = "CreateAuthor")]
        public IActionResult Post([FromBody] Author author)
        {
            using (var scope = new TransactionScope())
            {
                var result = _authorRepository.CreateAuthor(author);
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
                    message = "Created!",
                    data = result.Payload,
                    StatusCode = result.StatusCode
                };
                return new OkObjectResult(response);
            }
        }

        [HttpPut("{id}", Name = "UpdateAuthor")]
        public IActionResult Put(Author author)
        {
            using (var scope = new TransactionScope())
            {
                var result = _authorRepository.UpdateAuthor(author);
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
                    message = "Updated!",
                    data = result.Payload,
                    StatusCode = result.StatusCode
                };

                return new OkObjectResult(response);
            }
        }

        [HttpDelete("{id}", Name = "DeleteAuthor")]
        public IActionResult Delete(int id)
        {
            var result = _authorRepository.DeleteAuthor(id);
            if (!result.Success)
            {
                return StatusCode(result.StatusCode, new
                {
                    message = result.ErrorMessage
                });
            }

            var response = new
            {
                message = "Deleted!",
                data = result.Payload,
                StatusCode = result.StatusCode
            };

            return new OkObjectResult(response);
        }

        [HttpGet("{id}/books", Name = "GetAuthorBooks")]
        public IActionResult GetAuthorBooks(int id)
        {
            var books = _authorRepository.GetAuthorBooks(id);
            return new OkObjectResult(new
            {
                data = books,
                StatusCode = 200,
                total = books.Count()
            });
        } 
    }
}
