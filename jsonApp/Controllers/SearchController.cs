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
    public class SearchController : ApiController
    {
        private TestDataEntities db = new TestDataEntities();

        // GET: api/Search
        public IEnumerable<Sample> GetSamples()
        {
            var d = new Sample { Barcode = "value", CreatedBy = 1, };
            var l = new List<Sample>();
            l.Add(d);
            return l;
        }

        // GET: api/Search/string

        public IEnumerable<Sample> GetSample( string id)
        {
            /*
            var samples = from sample in db.Samples where sample.StatusId == id select sample;
            return samples;
            */
            var samples = from sample in db.Samples where (sample.User.LastName.Contains(id) || sample.User.FirstName.Contains(id))  select sample;
            return samples;
            
        }

        // PUT: api/Search/5
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

        // POST: api/Search
        [ResponseType(typeof(Sample))]
        public IHttpActionResult PostSample(Sample sample)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Samples.Add(sample);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = sample.SampleId }, sample);
        }

        // DELETE: api/Search/5
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