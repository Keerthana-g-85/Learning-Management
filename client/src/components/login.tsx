import { useState} from "react"
import { useNavigate ,Link , } from "react-router"
import {Api} from './Api'
import { TextField ,Box, Paper, Typography , Stack, Button, Snackbar } from "@mui/material";
import axios from "axios";
import image3 from '../assets/image3.png'
import { useDispatch} from 'react-redux'
import { addToken, addUser } from '../redux/LoginSlice'
import { jwtDecode } from "jwt-decode";


export default function Login (){
    const [login , setLogin] = useState({ email : '' , password : ''})

    const [error , setError] = useState({ 'errEmail':false , 'errPassword':false ,'error': false });
    

    const [errmessage , setErrmessage] = useState({'errEmail':'' , 'errPassword':'' , error:''})

    const dispatch = useDispatch()
    const nav = useNavigate()

    async function handleLogin (){
        
        try{
            if (!login.email) {
                setError(prev => ({ ...prev, errEmail: true }));
                setErrmessage(prev =>({...prev, errEmail:"Email is required"}));
            } 
            else {
                setError(prev =>({...prev , errEmail:false}));
                 setErrmessage(prev =>({...prev, errEmail:""}));
            }

            if (!login.password) {
                setError(prev =>({...prev , errPassword:true}));
                setErrmessage(prev=>({...prev, errPassword:"Password is required"}));
            }else {
                setError(prev =>({...prev , errPassword:false}));
                setErrmessage(prev=>({...prev, errPassword:""}));
            }


            if (!login.email || !login.password){
                console.log("Enter the values")
                return
            }
            else{
                const response = await Api({
                                        method: 'post',
                                        endpoint: '/register/login',
                                        data: login })

                localStorage.setItem('token' , response.data.accesstoken )
                dispatch(addToken(response.data.accesstoken ))
                console.log('decoded')
                const decoded = jwtDecode(response.data.accesstoken)
                dispatch(addUser(decoded))
                
                nav('/home')
            }

        }catch(error){
            if (axios.isAxiosError(error))
                {
                    console.log('login',error)
                    setError(prev=>({...prev,error:true}))
                    setErrmessage(prev=>({...prev, error:error.response?.data.message})); 
                }
            }    
        }
    return(
        <>
        <Box sx={{display:'flex' ,
                            justifyContent: 'center' , 
                            alignItems: 'center' , 
                            backgroundImage:`url(${image3})`, 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center',
                            width: '100%',
                            height: '100vh',}}>

                    <Paper elevation={4} sx={{ p: 5, 
                                        mt: 5, 
                                        borderRadius: 3 , 
                                        width:500,
                                        backgroundColor: 'rgba(252, 249, 249, 0.51)', 
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(217, 209, 209, 0.3)'}}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3}}>Login</Typography>
                <Stack spacing={4}>


            <TextField 
                fullWidth
                id={error.errEmail ? "standard-error":"standard-basic" }
                variant="standard"
                label="Email*" 
                type='text' 
                error={error.errEmail}
                value={login.email} 
                helperText={errmessage.errEmail }
                onChange={(e)=> { setLogin({...login,email:e.target.value})
                                  setError(prev =>({...prev , errEmail:false}));
                                  setErrmessage(prev =>({...prev, errEmail:""}));}}/>

            <TextField 
                fullWidth
                id={error.errPassword ? "standard-error":"standard-basic" }
                variant="standard"
                label="Password*" 
                type='text' 
                value={login.password} 
                error={error.errPassword}
                helperText={errmessage.errPassword}
                onChange={(e)=>{setLogin({...login,password:e.target.value})
                                setError(prev =>({...prev , errPassword:false}));
                                setErrmessage(prev=>({...prev, errPassword:""}));}}/>

            <Button variant="contained" onClick={handleLogin}>Login</Button>
            <Link   to="/register" > <Typography  variant="body2" 
            sx={{display:'flex' ,justifyContent: 'center' , alignItems: 'center'}}>Not an existing user? Register</Typography></Link>

            </Stack>
            </Paper>
            </Box>
            <Snackbar
                open={error.error}
                autoHideDuration={3000}
                message ={errmessage.error}
                onClose={() => setError(prev=>({...prev,error:false}))}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}/>


        </>
    )
}