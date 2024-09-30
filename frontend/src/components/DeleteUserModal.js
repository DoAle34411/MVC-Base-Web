import React from 'react';
import styles from '../styles/stylesModal.module.css'; 

const DeleteUserModal = ({ user, onConfirm, onCancel }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Borrar Usuario</h2>
                <p>¿Está seguro de que desea borrar el usuario <strong>{user.name}</strong>?</p>
                <div className={styles.modalButtons}>
                    <button className={styles.confirmButton} onClick={onConfirm}>
                        Sí
                    </button>
                    <button className={styles.cancelButton} onClick={onCancel}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;
