import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const AddUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        cedula: '',
        password: '',
        birthDate: '',
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            console.log(formData)
            await axios.post('http://localhost:5000/api/users', formData);
            toast.success('¡Usuario creado exitosamente!');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Error al agregar usuario', error);
            toast.error('Error al crear el usuario, por favor inténtalo de nuevo.');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
            <form onSubmit={handleSave}>
                <h2>Agregar Nuevo Usuario</h2>
                <input 
                    name="name" 
                    placeholder="Nombre" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    name="cedula" 
                    placeholder="Cédula" 
                    value={formData.cedula} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Clave" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    name="birthDate" 
                    type="date" 
                    value={formData.birthDate} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleCancel}>Cancelar</button>
            </form>
            <ToastContainer />
        </div>
        
    );
};

export default AddUser;
