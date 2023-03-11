import { Col, Row, Modal, Button } from "react-bootstrap";
import UserCard from "../UserCard/UserCard";
import { useState } from "react";
import UserProfileCard from "../UserProfileCard/UserProfileCard";

const UsersList = ({ users, onUserClick }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (user) => {
        setSelectedUser(user);
        onUserClick(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setShowModal(false);
    };

    return (
        <>
            <Row>
                {users.map((user) => (
                    <Col md={{ span: 3 }} key={user._id}>
                        <UserCard {...user} onClick={() => handleCardClick(user)} />
                    </Col>
                ))}
            </Row>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Perfil de usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <UserProfileCard user={selectedUser} fireFinalActions={handleCloseModal} />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UsersList;










// import './UsersList.css'
// import { Col, Row } from "react-bootstrap"
// import UserCard from '../UserCard/UserCard'


// const UsersList = ({ users }) => {
//     return (

//         <Row>
//             {
//                 users.map(elm => {
//                     return (
//                         <Col md={{ span: 3 }} key={elm._id}>
//                             <UserCard {...elm} />
//                         </Col>
//                     )
//                 })
//             }
//         </Row>

//     )
// }

// export default UsersList