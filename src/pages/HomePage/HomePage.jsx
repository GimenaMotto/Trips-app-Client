import './HomePage.css'
import { Image } from 'react-bootstrap'
import homepage from '../../assets/homepage.jpg'


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