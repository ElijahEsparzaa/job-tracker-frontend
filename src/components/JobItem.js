import React, { useState } from 'react';
import axios from 'axios';

export default function JobItem({ job, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(job.status);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://job-tracker-backend-tqc2.onrender.com/api/jobs/${job._id}`);
      onDelete(job._id); // Tell parent to update the UI
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleStatusSave = async () => {
    try {
      const updatedJob = { ...job, status };
      const res = await axios.put(`https://job-tracker-backend-tqc2.onrender.com/api/jobs/${job._id}`, updatedJob);
      onUpdate(res.data); // Tell parent to update UI with updated job
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div style={{ border: '1px solid gray', margin: '5px', padding: '10px' }}>
      <h3>{job.position} @ {job.company}</h3>
      <p>
        Status: {isEditing ? (
          <>
            <input
              value={status}
              onChange={handleStatusChange}
              autoFocus
            />
            <button onClick={handleStatusSave}>Save</button>
            <button onClick={() => { setIsEditing(false); setStatus(job.status); }}>Cancel</button>
          </>
        ) : (
          <>
            {status} <button onClick={() => setIsEditing(true)}>Edit</button>
          </>
        )}
      </p>
      <a href={job.link} target="_blank" rel="noreferrer">Job Link</a>
      <p>Notes: {job.notes}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}