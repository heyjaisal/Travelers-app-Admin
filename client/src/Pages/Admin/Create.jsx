import React, { useState } from 'react';
import axios from 'axios';

const AdminForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', mobile: '', password: '', role: 'admin', position: '', image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    
    try {
      const response = await axios.post('http://localhost:5000/api/create-admin', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  };

  return (
    <div className="container">
      <h2>Create New Admin</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'mobile', 'password', 'position'].map((field) => (
          <div key={field} className="form-group">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>
        <button type="submit">Create Admin</button>
      </form>
    </div>
  );
};

export default AdminForm;
