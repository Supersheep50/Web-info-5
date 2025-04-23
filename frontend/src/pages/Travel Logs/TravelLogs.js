import React, { useState, useEffect } from 'react';

function TravelLogs() {
    const [logs, setLogs] = useState([]);
    const [form, setForm] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        post_date: '',
        tags: ''
    });

const [editId, setEditId] = useState(null);
const userId = localStorage.getItem('userId');

const fetchLogs = ()  => {
    console.log('userId being sent:', userId);

    fetch ('http://localhost:5050/api/travel-logs', {
        headers: {'x-user-id': userId}
})

.then(res => res.json())
.then(data => {
    if (Array.isArray(data)) {
      setLogs(data);
    } else {
      console.error('Expected array but got:', data);
      setLogs([]); 
    }
  })
  
.catch(err => console.error('Error fetching logs:', err));
};


useEffect(() => {
    fetchLogs();
}, []);

const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
 
};

const handleSubmit = (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';

    const url = editId ? `http://localhost:5050/api/travel-logs/${editId}` : 'http://localhost:5050/api/travel-logs';


fetch (url, {
    method,
    headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId
    },
    body: JSON.stringify({
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim())
    })
})

.then(() => {
    
fetchLogs();

setForm({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    post_date: '',
    tags: ''})
    setEditId(null);
})
.catch(err=> console.error('Error saving log:', err));
};

const handleEdit = (log) => {
  setForm({
    title: log.title,
    description: log.description,
    start_date: log.start_date?.slice(0, 10) || '',
    end_date: log.end_date?.slice(0, 10) || '',
    post_date: log.post_date?.slice(0, 10) || '',
    tags: JSON.parse(log.tags).join(', ')
  });
  setEditId(log.id);
};


const handleDelete = (id) => {
    fetch(`http://localhost:5050/api/travel-logs/${id}`, {
        method: 'DELETE',
        headers: {
            'x-user-id': userId
        }
    })
    .then(() => fetchLogs())
    .catch(err => console.error('Error deleting log:', err));  

};

return (
    <div className="container mt-4">
      <h2>Travel Logs</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
  <div className="col-md-12">
    <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="form-control" required />
  </div>

  <div className="col-md-12">
    <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="form-control" required />
  </div>

  <div className="col-md-4">
    <label className="form-label">Start Date</label>
    <input name="start_date" type="date" value={form.start_date} onChange={handleChange} className="form-control" required />
  </div>

  <div className="col-md-4">
    <label className="form-label">End Date</label>
    <input name="end_date" type="date" value={form.end_date} onChange={handleChange} className="form-control" required />
  </div>

  <div className="col-md-4">
    <label className="form-label">Post Date</label>
    <input name="post_date" type="date" value={form.post_date} onChange={handleChange} className="form-control" required />
  </div>

  <div className="col-md-12">
    <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} className="form-control" required />
  </div>

  <div className="col-md-12">
    <button type="submit" className="btn btn-success">{editId ? 'Update' : 'Add'} Log</button>
  </div>
</form>



      {logs.map(log => (
        <div key={log.id} className="card mb-3">
          <div className="card-body">
            <h5>{log.title}</h5>
            <p>{log.description}</p>
            <p><strong>Start:</strong> {log.start_date?.slice(0, 10)}</p>
            <p><strong>End:</strong> {log.end_date?.slice(0, 10)}</p>

            <p><strong>Posted:</strong> {log.post_date?.slice(0, 10)}</p>
            <p><strong>Tags:</strong> {JSON.parse(log.tags).join(', ')}</p>
            <button className="btn btn-primary me-2" onClick={() => handleEdit(log)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(log.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TravelLogs;
