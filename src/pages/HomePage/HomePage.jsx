import './HomePage.css'
import { Figure, Image } from 'react-bootstrap'
import homepage from '../../assets/homepage.jpg'
import homepage1 from '../../assets/home-page.jpg'


const HomePage = () => {
    return (

        <Image
            className='Img-home'
            src={homepage}
            alt="HOME PAGE"
            fluid
        />
    )

}

export default HomePage