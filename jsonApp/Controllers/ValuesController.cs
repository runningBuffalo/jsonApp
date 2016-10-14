using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using jsonApp.Models;

namespace jsonApp.Controllers
{
    [AllowAnonymous]
    public class ValuesController : ApiController
    {
        TestDataEntities db = new TestDataEntities();
        // GET api/values
        //[Route("api/values/{param}/{id}")]
        public IEnumerable<Sample> Get()
        {
            //1.	Output all samples, their status, and the name of the user that created them.
            var samples = from sample in db.Samples select sample;
            return samples;
        }

        // GET api/values/5
        public IEnumerable<Sample> Get(int id)
        {
            //2.	Output all samples with a given status.
            var samples = from sample in db.Samples where sample.StatusId == id select sample;
            return samples;
        }

        // POST api/values
        public IEnumerable<Sample> Post([FromBody]string value)
        {
            var result = db.Samples.Where(item => value.Any(stringToCheck =>
    item.User.FirstName.Contains(stringToCheck) || item.User.LastName.Contains(stringToCheck)));
            return result;
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
