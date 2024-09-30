import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './components/AppRoutes'; // Import the new routes component
import DeleteUserModal from './components/DeleteUserModal';
import DeleteUser from './components/DeleteUser';
import styles from './styles/stylesMain.module.css'; 

function App() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteComponent, setShowDeleteComponent] = useState(false);

    const handleDeleteUser = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        console.log("Preparing to delete user:", userToDelete);
        setShowDeleteModal(false);
        setShowDeleteComponent(true);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    return (
        <div className={styles.container}>
            <Router>
            <div>
                <h1 className={styles.title}>Panel de Manejo de Usuarios</h1>
                    <Link to="/newUser" className={styles.link}>
                        <button className={styles.newButton}>Crear Usuario</button>
                    </Link>
                
                <AppRoutes 
                    setSelectedUser={setSelectedUser} 
                    handleDeleteUser={handleDeleteUser} 
                />
                {showDeleteModal && (
                    <DeleteUserModal 
                        user={userToDelete} 
                        onConfirm={confirmDelete} 
                        onCancel={cancelDelete} 
                    />
                )}
                {showDeleteComponent && (
                    <DeleteUser user={userToDelete} />
                )}
            </div>
        </Router>
        </div>
    );
}

export default App;
