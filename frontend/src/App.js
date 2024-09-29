import React, { useState } from 'react';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import DeleteUser from './components/DeleteUser';

function App() {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div>
            <h1>Panel de Manejo de Usuarios</h1>
            <AddUser />
            <UserList onSelectUser={setSelectedUser} />
            {selectedUser && (
                <div>
                    <UpdateUser user={selectedUser} />
                    <DeleteUser user={selectedUser} />
                </div>
            )}
        </div>
    );
}

export default App;
