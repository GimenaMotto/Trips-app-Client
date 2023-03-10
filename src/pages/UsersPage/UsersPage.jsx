import UsersList from '../../components/UsersList/UsersList'
import './UsersPage.css'
import { Container, Row, Col } from "react-bootstrap"
import usersService from '../../services/users.services'
import { useContext, useEffect, useState } from "react"


const UsersPage = () => {

    const [users, setUsers] = useState([])

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

    return (
        <>
            <Container className="UsersPage">
                <Row>
                    <Col >
                        <hr />
                        <h3>Comunidad usuarios de 360</h3>
                        <hr />
                        <UsersList users={users} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UsersPage
