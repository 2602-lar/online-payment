import axios from "axios";
import { createContext, useState} from "react";
import {jwtDecode} from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import {  proxy } from "../reusables/Requests";

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    let Navigate = useNavigate()

    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ?
        jwtDecode(localStorage.getItem('authTokens'))
        :
        null
    )
    let [authTokens, setAuthToken] = useState(() => localStorage.getItem('authTokens') ?
        JSON.parse(localStorage.getItem('authTokens'))
        :
        null
    )

    let loginUser = async (id, password) => {
        let response = ''
        await axios({
            method: 'POST',
            url: proxy + '/create_account',
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                username: id,
                password: password
            },
        }).then(async (res) => {
            if(res.data){
                console.log(res.data)
                localStorage.setItem('authTokens', JSON.stringify(res.data))
                setAuthToken(res.data)
                setUser(jwtDecode(res.data.access))
                console.log(user)
                console.log(res.data)
                localStorage.setItem('authTokens', JSON.stringify(res.data))
                response = res
                Navigate('/home/')
            }
         
        }).catch((err) => {
            console.log(err)
            response = err
        })
        return response
    }

    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        Navigate('/')
    }

    let contextData = {
        authTokens: authTokens,
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
} 