import axios from 'axios'

class UsersService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/users`
        })
    }

    getAllUsers() {
        return this.api.get('/getAllUsers')
    }


}

const usersService = new UsersService

export default usersService