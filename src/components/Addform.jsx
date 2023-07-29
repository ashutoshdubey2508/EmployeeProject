
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const FormComponent = ({ onClose, onAddEmployee }) => {
   const {id} = useParams();
   const [error, setError] = useState('');
  const [formData, setFormData] = useState({
            name: '',
            email: '',
            password: '',
            contact_number: '',
            blood_group: '',
            Father_name: '',
            physically_challenged: '',
            Religion: '',
            Graduation: '',
            percentage: '',
            passing_year: '',
            address: '',
            department: '',
            designation: '',
            location: '',
            image: '',
            manager_id: id 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.contact_number) {
        setError('Please fill in all the required fields.');
        return;
      }
    onAddEmployee(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="password" />
      <input type="tel" name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder="Contact Number" />
      <input type="text" name="blood_group" value={formData.blood_group} onChange={handleChange} placeholder="blood_group" />
      <input type="text" name="Father_name" value={formData.Father_name} onChange={handleChange} placeholder="Father_name" />
      <input type="text" name="physically_challenged" value={formData.physically_challenged} onChange={handleChange} placeholder="physically_challenged" />
      <input type="text" name="Religion" value={formData.Religion} onChange={handleChange} placeholder="Religion" />
      <input type="text" name="Graduation" value={formData.Graduation} onChange={handleChange} placeholder="Graduation" />
      <input type="percentage" name="percentage" value={formData.percentage} onChange={handleChange} placeholder="percentage" />
      <input type="calender" name="passing_year" value={formData.passing_year} onChange={handleChange} placeholder="passing_year" />
      <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="address" />
      <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="department" />
      <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="designation" />
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="location" />
    
      <button type="submit">Done</button>
    </form>
  );
};

export default FormComponent;
