import axios from 'axios'
import config from '../config'

const loginService = async (username, password) => {
    try {
        const res = await axios.post(`${config.api}/api/login`, {
            username, password
        })
        return res.data
    } catch (e) {
        return false
    }

}

export  { loginService }