import { Modal, Button } from 'react-bootstrap'
import UserProfileCard from '../UserProfileCard/UserProfileCard'

const UserProfileModal = ({ showModal, user, onClose }) => {
    return (
        <Modal show={showModal} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Perfil de usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserProfileCard user={user} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserProfileModal