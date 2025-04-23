import React, { useState, useEffect } from 'react';

function JourneyPlans() {


    const [plans, setPlans] = useState([]);
    const [form, setForm] = useState({
        name: '',
        locations: '',
        start_date: '',
        end_date: '',
        activities: '',
        description: ''
    });

    const [editId, setEditId] = useState(null);
    const userId = localStorage.getItem('userId');

    const fetchPlans = () => {
        fetch('http://localhost:5050/api/journey-plans', {
            headers: { 'x-user-id': userId }
        })
            .then(res => res.json())
            .then(data => setPlans(data))
            .catch(err => console.error('Error fetching plans:', err));
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editId ? 'PUT' : 'POST';

        const url = editId ? `http://localhost:5050/api/journey-plans/${editId}` : 'http://localhost:5050/api/journey-plans';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': userId
            },
            body: JSON.stringify({
                ...form,
                locations: form.locations.split(',').map(loc => loc.trim()),
                activities: form.activities.split(',').map(act => act.trim())
            })
        })
            .then(() => {
                fetchPlans();
                setForm({
                    name: '',
                    locations: '',
                    start_date: '',
                    end_date: '',
                    activities: '',
                    description: ''
                });
                setEditId(null);
            })
            .catch(err => console.error('Error saving plan:', err));
    };  

    const handleEdit = (plan) => {
      setForm({
        name: plan.name,
        locations: JSON.parse(plan.locations).join(', '),
        start_date: plan.start_date?.slice(0, 10) || '',
        end_date: plan.end_date?.slice(0, 10) || '',
        activities: JSON.parse(plan.activities).join(', '),
        description: plan.description
      });
      setEditId(plan.id);
    };
    

    const handleDelete = (id) => {
        fetch(`http://localhost:5050/api/journey-plans/${id}`, {
            method: 'DELETE',
            headers: { 'x-user-id': userId }
        })
            .then(() => fetchPlans())
            .catch(err => console.error('Error deleting plan:', err));
    };

    return (
        <div className="container mt-4">
          <h2>Journey Plans</h2>
    
          <form onSubmit={handleSubmit} className="row g-3 mb-4">
  <div className="col-md-12">
    <input
      name="name"
      placeholder="Plan Name"
      value={form.name}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>

  <div className="col-md-6">
    <label className="form-label">Start Date</label>
    <input
      name="start_date"
      type="date"
      value={form.start_date}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>

  <div className="col-md-6">
    <label className="form-label">End Date</label>
    <input
      name="end_date"
      type="date"
      value={form.end_date}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>

  <div className="col-md-12">
    <input
      name="locations"
      placeholder="Locations (comma separated)"
      value={form.locations}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>

  <div className="col-md-12">
    <input
      name="activities"
      placeholder="Activities (comma separated)"
      value={form.activities}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>

  <div className="col-md-12">
    <textarea
      name="description"
      placeholder="Plan Description"
      value={form.description}
      onChange={handleChange}
      className="form-control"
      required
    />
  </div>

  <div className="col-md-12">
    <button type="submit" className="btn btn-success">{editId ? 'Update' : 'Add'} Plan</button>
  </div>
</form>

    
          {plans.map(plan => (
            <div key={plan.id} className="card mb-3">
              <div className="card-body">
                <h5>{plan.name}</h5>
                <p>{plan.description}</p>
                <p><strong>Start:</strong> {plan.start_date?.slice(0, 10)}</p>
                <p><strong>End:</strong> {plan.end_date?.slice(0, 10)}</p>
                <p><strong>Locations:</strong> {JSON.parse(plan.locations).join(', ')}</p>
                <p><strong>Activities:</strong> {JSON.parse(plan.activities).join(', ')}</p>
                <button className="btn btn-primary me-2" onClick={() => handleEdit(plan)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(plan.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    export default JourneyPlans;

