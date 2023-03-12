using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AlphaQuizAPI.Models;

namespace AlphaQuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly QuizDbContext _quizDbContext;

        public QuestionController(QuizDbContext quizDbContext)
        {
            _quizDbContext = quizDbContext;
        }

        // GET: api/Question
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            var randomFiveQuestions = await _quizDbContext.Questions
                .Select(q => new
                {
                    QuestionId = q.QuestionId,
                    QuestionInWords = q.QuestionInWords,
                    ImageName = q.ImageName,
                    Options = new string[] { q.Option1, q.Option2, q.Option3, q.Option4 }
                })
                .OrderBy(q => Guid.NewGuid())
                .Take(5)
                .ToListAsync();

            return Ok(randomFiveQuestions);
        }

        // POST: api/Question/GetAnswers
        [HttpPost]
        [Route("GetAnswers")]
        public async Task<ActionResult<Question>> RetrieveAnswers(int[] questionIds)
        {
            var answers = await (_quizDbContext.Questions
                .Where(id => questionIds.Contains(id.QuestionId))
                .Select(q => new
                {
                    QuestionId = q.QuestionId,
                    QuestionInWords = q.QuestionInWords,
                    ImageName = q.ImageName,
                    Options = new string[] { q.Option1, q.Option2, q.Option3, q.Option4 },
                    Answer = q.Answer
                })).ToListAsync();

            return Ok(answers);
        }
    }
}
