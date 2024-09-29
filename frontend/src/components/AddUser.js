import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        cedula: '',
        password: '',
        birthDate: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users', formData);
            alert('¡Usuario creado exitosamente!');
        } catch (error) {
            console.error('Error al agregar usuario', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} />
            <input name="cedula" placeholder="Cedula" value={formData.cedula} onChange={handleChange} />
            <input name="password" type="password" placeholder="Clave" value={formData.password} onChange={handleChange} />
            <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
            <button type="submit">Agregar Usuario</button>
        </form>
    );
};

export default AddUser;