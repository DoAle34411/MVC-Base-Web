import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/stylesTable.module.css'; 

const UserList = ({ onSelectUser, onDeleteUser }) => {
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
            <h2>Listado de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Password</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Actualizar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.cedula}</td>
                            <td>{user.password}</td>
                            <td>{user.birthDate}</td>
                            <td>
                                <button onClick={() => onSelectUser(user)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </td>
                            <td>
                                <button onClick={() => onDeleteUser(user)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
