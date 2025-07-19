import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://job-tracker-backend-tqc2.onrender.com';

export default function JobForm({ onAdd }) {
  const [job, setJob] = useState({
    company: '',
    position: '',
    link: '',
    status: '',
    notes: ''
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/jobs`, job);
      onAdd(res.data);
      setJob({ company: '', position: '', link: '', status: '', notes: '' });
    } catch (error) {
      console.error('Failed to add job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="company" value={job.company} onChange={handleChange} placeholder="Company" />
      <input name="position" value={job.position} onChange={handleChange} placeholder="Position" />
      <input name="link" value={job.link} onChange={handleChange} placeholder="Link" />
      <input name="status" value={job.status} onChange={handleChange} placeholder="Status" />
      <textarea name="notes" value={job.notes} onChange={handleChange} placeholder="Notes" />
      <button type="submit">Add Job</button>
    </form>
  );
}