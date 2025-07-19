import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobItem from './JobItem';

const BASE_URL = 'https://job-tracker-backend-tqc2.onrender.com';

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/jobs`)
      .then(res => setJobs(res.data))
      .catch(err => console.error('Error fetching jobs:', err));
  }, []);

  const handleDelete = (id) => {
    setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
  };

  const handleUpdate = (updatedJob) => {
    setJobs(prevJobs => prevJobs.map(job => 
      job._id === updatedJob._id ? updatedJob : job
    ));
  };

  return (
    <div>
      <h2>Job List</h2>
      {jobs.map(job => (
        <JobItem 
          key={job._id} 
          job={job} 
          onDelete={handleDelete} 
          onUpdate={handleUpdate} 
        />
      ))}
    </div>
  );
}