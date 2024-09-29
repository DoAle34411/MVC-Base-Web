import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = ({ user }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        password: '',
        birthDate: user.birthDate,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/users/${user.cedula}`, formData);
            alert('User updated successfully');
        } catch (error) {
            console.error('Error actualizando usuario', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input name="password" type="password" placeholder="New Password" value={formData.password} onChange={handleChange} />
            <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
            <button type="submit">Actualizar Usuario</button>
        </form>
    );
};

export default UpdateUser;