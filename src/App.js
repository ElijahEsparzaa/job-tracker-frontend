import React, { useState } from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

function App() {
  const [jobs, setJobs] = useState([]);

  const addJob = (newJob) => {
    setJobs([...jobs, newJob]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Job Tracker</h1>
      <JobForm onAdd={addJob} />
      <JobList />
    </div>
  );
}

export default App;