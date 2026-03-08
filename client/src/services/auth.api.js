import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

export const register = async ({ name, email, password }) => {

    try {
        const response = await api.post('/api/auth/register', {
        name,email,password
    })

        return response.data;
    } catch (error) {
        console.error("Error in register : ", error)
    }
}

export const login = async ({ email, password }) => {

    try {
        const response = await api.post('/api/auth/login', {
        email,password
    })

        return response.data;
    } catch (error) {
        console.error("Error in login : ", error)
    }
}

export const logout = async () => {
    try {
        const response = await api.get('/api/auth/logout')
        // console.log("Response : ",response);
        return response.data
    } catch (error) {
        console.error("Error in logout : ", error);
    }
}

export const getMe = async () => {
    try {
        const response = await api.get('/api/auth/get-me')

        return response.data
    } catch (error) {
        throw error
    }
}

