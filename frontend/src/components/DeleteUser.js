import React, { useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const DeleteUser = ({ user }) => {
    useEffect(() => {
        const handleDelete = async () => {
            try {
                const response = await axios.delete(`http://localhost:5000/api/users/${user.cedula}`);
                if (response.status === 200 || response.status === 204) {
                    toast.success('¡Usuario eliminado!');
                } else {
                    throw new Error('Unexpected response status');
                }
            } catch (error) {
                toast.error('Error borrando usuario');
                console.error('Error borrando usuario:', error);
            }
        };
        handleDelete();
    }, [user]);

    return (
        <div>
            <ToastContainer /> {/* To show toast notifications */}
        </div>
    );
};

export default DeleteUser;
