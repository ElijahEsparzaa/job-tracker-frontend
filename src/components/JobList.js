import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobItem from './JobItem';

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => setJobs(res.data));
  }, []);

  return (
    <div>
      <h2>Job List</h2>
      {jobs.map(job => <JobItem key={job._id} job={job} />)}
    </div>
  );
}