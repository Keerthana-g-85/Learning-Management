import {useState} from "react"
import { useNavigate } from "react-router"
import api from './api'
import { TextField ,Container, Paper, Typography , Stack, Button} from "@mui/material";
import axios from "axios";

export default function Login (){
    const [login , setLogin] = useState({ Email : '' , Password : ''})
    const [error,setError] = useState(false)
    const [errstatus , setStatus] = useState(0)
    const nav = useNavigate()

    async function handleLogin (){
        try{
            if (!login.Email || !login.Password){
                console.log("Enter the values")
                setError(true)
            }
            else{
                setError(false)
                const data =await api.post('/register/login',login)
                console.log(data.data.token) 
                nav('/home')
            }

        }catch(error){
            if (axios.isAxiosError(error)){
                if (error.response?.status ){
                    setStatus(error.response.status)           
                }
            }
        }

    }
    return(
        <>
        <Container sx={{display:'flex' ,justifyContent: 'center' , alignItems: 'center'}}>
            <Paper elevation={4} sx={{ p: 5, mt: 5, borderRadius: 3 , width:500 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3}}>Login</Typography>
                <Stack spacing={4}>


            <TextField 
                fullWidth
                id={error ? "outlined-error":"outlined-basic" }
                variant="outlined"
                label="Email*" 
                type='text' 
                error={error || errstatus ===404 }
                value={login.Email} 
                helperText={error ? "Email required": errstatus ===404 ? "User not yet registered" : null  }
                onChange={(e)=>setLogin({...login,Email:e.target.value})} />
            <TextField 
                fullWidth
                id={error ? "outlined-error":"outlined-basic" }
                variant="outlined"
                label="Password*" 
                type='text' 
                value={login.Password} 
                error={error || errstatus == 401}
                helperText={error ? "Password required":  errstatus == 401 ? "Password invalid": null }
                onChange={(e)=>setLogin({...login,Password:e.target.value})}/>
            <Button variant="contained" onClick={handleLogin}>Login</Button>
            </Stack>
            </Paper>
            </Container>

        </>
    )
}