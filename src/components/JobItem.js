import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://job-tracker-backend-tqc2.onrender.com';

export default function JobItem({ job, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(job.status);

  // Delete job handler
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/jobs/${job._id}`);
      onDelete(job._id); // Notify parent to update UI
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  // Handle change of status input
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // Save updated status to backend
  const handleStatusSave = async () => {
    try {
      const updatedJob = { ...job, status };
      const res = await axios.put(`${BASE_URL}/api/jobs/${job._id}`, updatedJob);
      onUpdate(res.data); // Update parent UI with new job data
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // Cancel editing and revert status input to original
  const handleCancel = () => {
    setIsEditing(false);
    setStatus(job.status);
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
            <button onClick={handleCancel}>Cancel</button>
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