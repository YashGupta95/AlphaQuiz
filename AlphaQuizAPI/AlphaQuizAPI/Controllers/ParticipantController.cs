using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AlphaQuizAPI.Models;

namespace AlphaQuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        private readonly QuizDbContext _quizDbContext;

        public ParticipantController(QuizDbContext quizDbContext)
        {
            _quizDbContext = quizDbContext;
        }

        // PUT: api/Participant/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParticipant(int id, ParticipantResult participantResult)
        {
            if (id != participantResult.ParticipantId)
            {
                return BadRequest();
            }

            // get the current record of the participant, and update it with the quiz results
            var participant = _quizDbContext.Participants.Find(id);

            if (participant != null)
            {
                participant.Score = participantResult.Score;
                participant.TimeTaken = participantResult.TimeTaken;
            }

            _quizDbContext.Entry(participant).State = EntityState.Modified;

            try
            {
                await _quizDbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParticipantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Participant
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Participant>> PostParticipant(Participant participant)
        {
            var existingParticipant = _quizDbContext.Participants
                .Where(p => p.Name == participant.Name && p.Email == participant.Email)
                .FirstOrDefault();

            if (existingParticipant == null)
            {
                _quizDbContext.Participants.Add(participant);
                await _quizDbContext.SaveChangesAsync();
            }
            else
            {
                participant = existingParticipant;
            }

            return Ok(participant);
        }

        private bool ParticipantExists(int id)
        {
            return _quizDbContext.Participants.Any(e => e.ParticipantId == id);
        }
    }
}
