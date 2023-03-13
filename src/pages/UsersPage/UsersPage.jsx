import UsersList from '../../components/UsersList/UsersList'
import './UsersPage.css'
import { Container, Row, Col } from "react-bootstrap"
import usersService from '../../services/users.services'
import { useEffect, useState } from "react"

const UsersPage = () => {

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = () => {
        usersService
            .getAllUsers()
            .then(({ data }) => {
                setUsers(data)
            })
    }

    const handleCardClick = (user) => {
        setSelectedUser(user)
        setShowModal(true)
    };

    return (
        <>
            <Container className="UsersPage">
                <Row className="justify-content-center align-items-center">
                    <Col xs={8} md={8} lg={9} className="mt-3">
                        <h3>Comunidad usuarios de 360</h3>
                        <UsersList users={users} onUserClick={handleCardClick} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UsersPage

