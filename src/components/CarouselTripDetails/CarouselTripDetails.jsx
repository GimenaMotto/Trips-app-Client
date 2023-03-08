import './CarouselTripDetails.css'
import { Row, Col, Carousel, Container } from "react-bootstrap"


const CarouselTripDetails = ({ trip }) => {
    return (
        // las imagenes son de un array
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="mb-3">
                    <Carousel className="CarouselTripsDetails" indicators={true}>
                        <Carousel.Item interval={1000}>
                            <img
                                className="d-block w-100 Img-carousel"
                                src="https://i.kym-cdn.com/entries/icons/original/000/034/772/Untitled-1.png"
                                alt="First slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>

        </Container>
    )
}

export default CarouselTripDetails