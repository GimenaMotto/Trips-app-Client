import UserProfileCard from '../../components/UserProfileCard/UserProfileCard'
import { Link } from 'react-router-dom'
import tripsService from '../../services/trips.services'
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import TripCard from '../../components/TripCard/TripCard'
import { Col, Row, Container, Button } from "react-bootstrap"
import { ThemeContext } from '../../contexts/theme.context'


const UsersProfilePage = () => {


    const { themeValue, switchTheme } = useContext(ThemeContext)
    const style = themeValue === 'dark' ? 'light' : 'dark'
    const [trips, setTrip] = useState([])
    const { user_id } = useParams()

    useEffect(() => {
        loadTripData()
    }, [])

    const loadTripData = () => {
        tripsService
            .getOrganizer(user_id)
            .then(({ data }) => setTrip(data))
            .catch(err => console.log(err))
    }

    return (

        <div>
            <Container className="py-5 h-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col lg="6" xl="9">
                        <UserProfileCard />
                        <Row>
                            <h3>Mis Viajes:</h3>
                            {trips.map(elm => {
                                return (
                                    <Col className='md-4 mt-3 col-6 col-md-4' key={elm._id}>
                                        <TripCard {...elm} setTrip={setTrip} />
                                    </Col>
                                );
                            })}
                        </Row>
                        {/* <div className="d-flex justify-content-between align-items-center mb-4">
                            <Link to="javascript:history.back()" className="btn btn-outline" variant={style}>Volver</Link>
                        </div> */}
                        <Link to="javascript:history.back()"> <Button variant={style} className='outline' as="span">Volver</Button></Link>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default UsersProfilePage