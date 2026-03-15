import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {

        const publicRoutes = ["/login","/register"]
      // prevent infinite redirect
      if(!publicRoutes.includes(window.location.pathname)){
        window.location.href = "/login"
      }
      

    }

    return Promise.reject(error);
  }
);

export const register = async ({ name, email, password }) => {

    try {
        const response = await api.post('/api/auth/register', {
        name,email,password
    })

        return response.data;
    } catch (error) {
        console.error("Error in register : ", error)
        throw error
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
        throw error
    }
}

export const logout = async () => {
    try {
        const response = await api.get('/api/auth/logout')
        // console.log("Response : ",response);
        return response.data
    } catch (error) {
        console.error("Error in logout : ", error);
        throw error
    }
}

export const getMe = async () => {
    try {
        const response = await api.get('/api/auth/get-me')

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

