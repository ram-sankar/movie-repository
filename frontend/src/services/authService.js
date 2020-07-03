import http from './httpService'
import jwtDecode from 'jwt-decode'

const url = '/auth'
const tokenKey = "token"

http.setToken(getToken());

export async function loginUser(param){
    const data ={email:param.username, password:param.password}
    const res = await http.post(url, data)
    localStorage.setItem(tokenKey, res.data)
}

export function loginWithJwt(res){    
    localStorage.setItem(tokenKey, res.headers["x-auth-token"])
}

export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt)
    } catch (error) {
        return null;
    }
}

export function getToken(){
    return localStorage.getItem(tokenKey)
}

export function logout(){
    localStorage.removeItem(tokenKey)
}

export default {
    loginUser,
    loginWithJwt,
    getCurrentUser,
    getToken,
    logout
}