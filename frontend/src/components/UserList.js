import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = ({ onSelectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error obteniendo usuarios', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Listado de Usuarios</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id} onClick={() => onSelectUser(user)}>
                        {user.name} - {user.cedula}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;