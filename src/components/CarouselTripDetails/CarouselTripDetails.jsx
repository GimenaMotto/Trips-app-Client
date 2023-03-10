import './CarouselTripDetails.css'
import { Row, Col, Carousel, Container } from "react-bootstrap"


const CarouselTripDetails = ({ trip }) => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="mb-3">
                    {trip.images && (
                        <Carousel className="CarouselTripsDetails" indicators={true}>
                            {trip.images.map((image, index) => (
                                <Carousel.Item key={index} interval={1000}>
                                    <img
                                        className="d-block w-100 Img-carousel"
                                        src={image}
                                        alt={`Slide ${index}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default CarouselTripDetails