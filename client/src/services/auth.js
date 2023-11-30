import axios from 'axios';
import authHeader from './authHeader';

// const SERVER_URL = "http://localhost:8080/api/auth/";

const login = async (email, password)=>{
    try{
        const response = await axios.post('/api/login',{
            email:email,
            password:password
        }).catch((error)=>{

            // console.log(error);
            return error.response;
        })
        // console.log(response);
        if(response.data.authenticated && response.data.access_token){
            // console.log('token saved');
            await localStorage.setItem("access_token", JSON.stringify(response.data.access_token));
        }
        return response;
    }catch(error){
        return false;
    }
}

const register = async(data)=>{
    try {
        const response = await axios.post('/api/user',data).catch((error)=>{

            // console.log(error);
            return error.response;
        })
        return response
    } catch (error) {
        return false
    }
}


const getAccessToken = async () =>{ 
    
    const token = await JSON.parse(localStorage.getItem("access_token"));
    return token;
}

const logout = async ()=>{
    //console.log('Logged out called ' + await JSON.parse(localStorage.getItem("access_token")));
    try{
        const response = await axios.get('/api/logout', { headers: await authHeader() }).catch((error)=>{
        // console.log(error.response);
        return error.response.status;
        }); 

        if(response.status === 200){
            await localStorage.removeItem("access_token");
            return response.status;
        }
    }catch(error){
        return false;
    }       
}


const isAuthenticated = async () => {
    try {
        const response = await axios.get('/api/is_authenticated', { headers: await authHeader() }).catch((error)=>{
        // console.log(error.response);
        return false;
        }); 
        if(response.status === 200){
            return response.data;
        }else{
            return response.data;
        }
    } catch (error) {
        return false;
    }
}

const services = {
    login,
    register,
    getAccessToken,
    logout,    
    isAuthenticated
    
}

export default services;