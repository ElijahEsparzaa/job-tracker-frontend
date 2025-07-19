import React from 'react';
import JobItem from './JobItem';

export default function JobList({ jobs, onDelete, onUpdate }) {
  return (
    <div>
      <h2>Job List</h2>
      {jobs.map(job => (
        <JobItem 
          key={job._id} 
          job={job} 
          onDelete={onDelete} 
          onUpdate={onUpdate} 
        />
      ))}
    </div>
  );
}