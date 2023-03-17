import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Map from '../../images/map.jpg'

const AboutPage = () => {

    return (
        <Container>
            <Row className="d-flex justify-content-center mt-2">
                <img src={Map} alt="map" style={{ maxWidth: "40%", margin: "40px" }} />
            </Row>
            <Row className="d-flex justify-content-center mb-5">
                <Col md={8} className="text-center">
                    <h2>Sobre nosotros:</h2>
                    <p>Bienvenidos a 360, la comunidad de viajeros más emocionante de la red. Nuestro objetivo es conectar a personas de todo el mundo para que puedan disfrutar juntos de las aventuras más inolvidables.
                        <br />
                        Somos un equipo de viajeros apasionados que cree que viajar en compañía es la mejor forma de explorar nuevos lugares y culturas. En nuestra web, puedes publicar tus propios viajes y encontrar compañeros de viaje con los que compartir tus experiencias.
                        <br />
                        Ya sea que estés buscando un viaje de mochilero por Asia, una expedición por el Amazonas o una escapada de fin de semana en Europa, estamos seguros de que encontrarás el compañero perfecto en nuestra comunidad. ¿Quieres descubrir las maravillas de Tailandia con un grupo de aventureros como tú? ¿O prefieres disfrutar de la costa italiana con alguien que comparta tus intereses? ¡Aquí tienes la oportunidad!
                        Creemos que viajar es una forma de vida y estamos comprometidos a hacer que tu experiencia de viaje sea lo más emocionante, segura y memorable posible. Por eso, nuestra web cuenta con una serie de herramientas y funciones que te ayudarán a encontrar el compañero de viaje perfecto, desde la búsqueda por destino y fecha hasta la verificación de perfiless.
                        <br />
                        Únete a nuestra comunidad y comienza a explorar el mundo con amigos nuevos y apasionados. En 360, la aventura te espera.</p>
                </Col>
            </Row>
        </Container>
    );
}
export default AboutPage