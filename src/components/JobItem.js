import React from 'react';

export default function JobItem({ job }) {
  return (
    <div style={{ border: '1px solid gray', margin: '5px', padding: '10px' }}>
      <h3>{job.position} @ {job.company}</h3>
      <p>Status: {job.status}</p>
      <a href={job.link} target="_blank" rel="noreferrer">Job Link</a>
      <p>Notes: {job.notes}</p>
    </div>
  );
}