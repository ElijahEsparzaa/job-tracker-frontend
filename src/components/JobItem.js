import React from 'react';
import axios from 'axios';

export default function JobItem({ job, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://job-tracker-backend-tqc2.onrender.com/api/jobs/${job._id}`);
      onDelete(job._id); // Tell parent to update the UI
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  return (
    <div style={{ border: '1px solid gray', margin: '5px', padding: '10px' }}>
      <h3>{job.position} @ {job.company}</h3>
      <p>Status: {job.status}</p>
      <a href={job.link} target="_blank" rel="noreferrer">Job Link</a>
      <p>Notes: {job.notes}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}