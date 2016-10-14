using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using jsonApp.Models;

namespace jsonApp.Controllers
{
    public class SamplesController : ApiController
    {
        private TestDataEntities db = new TestDataEntities();

        // GET: api/Samples
        public IQueryable<Sample> GetSamples()
        {
            return db.Samples;
        }

        // GET: api/Samples/5
        [ResponseType(typeof(Sample))]
        public IEnumerable<Sample> GetSample(int id)
        {
            var samples = from sample in db.Samples where sample.CreatedBy == id select sample;

            return samples;
        }

        // PUT: api/Samples/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSample(int id, Sample sample)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sample.SampleId)
            {
                return BadRequest();
            }

            db.Entry(sample).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SampleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Samples
        [ResponseType(typeof(Sample))]
        public IHttpActionResult PostSample(Sample newSample)
        {
            //Sample newSample = new Sample { SampleId = id, Barcode = barcode, CreatedBy = creator, StatusId = status };

            //var sampleList = (from sample in db.Samples select sample).First();
            db.Samples.Add(newSample);
            var message = "";
            try
            {
                db.SaveChanges();
                message = "New sample has been saved";
            }
            catch
            {
                message = "Sorry, but there has been an error";
            }

            return View(message);
        }

        // DELETE: api/Samples/5
        [ResponseType(typeof(Sample))]
        public IHttpActionResult DeleteSample(int id)
        {
            Sample sample = db.Samples.Find(id);
            if (sample == null)
            {
                return NotFound();
            }

            db.Samples.Remove(sample);
            db.SaveChanges();

            return Ok(sample);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SampleExists(int id)
        {
            return db.Samples.Count(e => e.SampleId == id) > 0;
        }
    }
}