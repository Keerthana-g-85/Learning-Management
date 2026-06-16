import {useState} from "react"
import api from './api'
export default function Login (){
    const [login , setLogin] = useState({ Email : '' , Password : ''})

    async function handleLogin (){
        try{
            if (!login.Email || !login.Password){
                alert('Enter credintials')
                console.log("Enter the values")
            }
            else{
                const data =await api.post('/register/login',login)
                console.log(data.data.token)
                
            }

        }catch(error){
            console.log(error)

        }

    }
    return(
        <>
            Email : <input type='text' value={login.Email} onChange={(e)=>setLogin({...login,Email:e.target.value})}></input>
            Password : <input type='text' value={login.Password} onChange={(e)=>setLogin({...login,Password:e.target.value})}></input>
            <button onClick={handleLogin}>Login</button>

        </>
    )
}