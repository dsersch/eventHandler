import axios from 'axios'
import jwtDecode from 'jwt-decode'

const clientAuth = axios.create()
clientAuth.defaults.headers.common.token = getToken()

// get the token from browser storage

function getToken(){
    return localStorage.getItem('token')
}

// set the token

function setToken(token){
    localStorage.setItem('token', token)
    return token
}

// decode that motherfucker

function getCurrentUser(){
    const token = getToken()
    if (token) return jwtDecode(token)
    return null
}

// login function

function logIn(credentials){
    return clientAuth({
        method: 'post',
        url: '/api/users/authenticate',
        data: credentials
    }).then((res)=>{
        const token = res.data.token
        if (token) {
            clientAuth.defaults.headers.common.token = setToken(token)
            return jwtDecode(token)
        } else {
            return false
        }
    })
}

// logout

function logOut(){
    localStorage.removeItem('token')
    delete clientAuth.defaults.headers.common.token
    return true
}

export default {
    getCurrentUser,
    logIn,
    logOut
}