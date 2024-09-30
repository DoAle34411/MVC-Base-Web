import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const UpdateUser = () => {
    const { cedula } = useParams(); // Get cedula from URL
    const [formData, setFormData] = useState({
        name: '',
        cedula: '',
        password: '',
        birthDate: '',
    });
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${cedula}`);
                setFormData(response.data); 
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        fetchUser();
    }, [cedula]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData)
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedFields = {
            name: formData.name,
            password: formData.password,
            birthDate: formData.birthDate,
        };
        try {
            await axios.put(`http://localhost:5000/api/users/${cedula}`, updatedFields);
            toast.success('Usuario actualizado exitosamente!');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Error actualizando usuario', error);
            alert('Error al actualizar el usuario, por favor inténtalo de nuevo.');
        }
    };

    const handleCancel = () => {
        navigate('/'); // Redirect to the main page on cancel
    };

    return (
        <div>
            <form onSubmit={handleSave}>
            <h2>Actualizar Usuario</h2>
            <input 
                name="name" 
                placeholder="Nombre" 
                value={formData.name} 
                onChange={handleChange} 
                required 
            />
            <input 
                name="password" 
                type="password" 
                placeholder="Nueva Clave" 
                value={formData.password} 
                onChange={handleChange} 
            />
            <input 
                name="birthDate" 
                type="date" 
                value={formData.birthDate} 
                onChange={handleChange} 
                required 
            />
            <button type="submit">Actualizar</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
        </form>
            <ToastContainer />
        </div>
        
    );
};

export default UpdateUser;
