import React from 'react';
import axios from 'axios';

const DeleteUser = ({ user }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${user.cedula}`);
            alert('¡Usuario eliminado!');
        } catch (error) {
            console.error('Error borrando usuario', error);
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Borrar Usuario</button>
        </div>
    );
};

export default DeleteUser;