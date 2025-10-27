import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

const BASE_URL = 'https://job-tracker-backend-tqc2.onrender.com';

function App() {
  const [jobs, setJobs] = useState([]);

  //Fetch jobs from backend on first render
  useEffect(() => {
    axios.get(`${BASE_URL}/api/jobs`)
      .then(res => setJobs(res.data))
      .catch(err => console.error('Error fetching jobs:', err));
  }, []);

  //Add job to state
  const addJob = (newJob) => {
    setJobs(prevJobs => [newJob, ...prevJobs]);
  };

  //Remove job from state by id
  const handleDelete = (id) => {
    setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
  };

  //Update job in state after edit
  const handleUpdate = (updatedJob) => {
    setJobs(prevJobs => prevJobs.map(job => 
      job._id === updatedJob._id ? updatedJob : job
    ));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Job Tracker</h1>
      <JobForm onAdd={addJob} />
      <JobList jobs={jobs} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}

export default App;