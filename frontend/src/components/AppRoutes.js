// src/components/AppRoutes.js

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import UserList from './UserList';
import UpdateUser from './UpdateUser';
import AddUser from './AddUser';

const AppRoutes = ({ setSelectedUser, handleDeleteUser }) => {
    const navigate = useNavigate(); 
    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <UserList 
                        onSelectUser={(user) => {
                            setSelectedUser(user);
                            navigate(`/updateUser/${user.cedula}`);
                        }}
                        onDeleteUser={handleDeleteUser}
                    />
                } 
            />
            <Route path="/newUser" element={<AddUser />} />
            <Route path="/updateUser/:cedula" element={<UpdateUser />} />
        </Routes>
    );
};

export default AppRoutes;
