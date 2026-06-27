import { useState } from "react"
import useApi from './Api'
import axios from 'axios'
import {useNavigate , Link} from "react-router"
import { TextField ,Box, Paper, Typography , Stack, Button , Snackbar} from "@mui/material";
import image3 from '../assets/image3.png'

export default function Register (){

    const [register , setRegister] = useState({ name :'' , email: '' , password: '' , phoneNumber:'' , address:''})
    
    const [error , setError] = useState({errName:false , errEmail:false , errPassword:false , error:false})

    const [errmessage , setErrmessage] = useState({'errName':'' , 'errEmail':'' , 'errPassword':'' , 'error':''})
    const { Api } = useApi();
    const nav = useNavigate()
     async function handleRegister(){
        try{
            if (!register.name) {
                setError(prev => ({ ...prev, errName: true }));
                setErrmessage(prev=>({...prev, errName:"Name is required"}));
            };


            if (!register.email) {
                setError(prev => ({ ...prev, errEmail: true }));
                setErrmessage(prev =>({...prev, errEmail:"Email is required"}));
            } 
            else {
                setError(prev =>({...prev , errEmail:false}));
                 setErrmessage(prev =>({...prev, errEmail:""}));
            }


            if (!register.password) {
                setError(prev =>({...prev , errPassword:true}));
                setErrmessage(prev=>({...prev, errPassword:"Password is required"}));
            }
            else if (register.password.length < 8) {
               setError(prev =>({...prev , errPassword:true}));
               setErrmessage(prev=>({...prev, errPassword:"atleast 8 characters required"}));
            }
            else if (!/[A-Z]/.test(register.password)) {
                setError(prev =>({...prev , errPassword:true}));
                setErrmessage(prev=>({...prev, errPassword:"atleast 1 uppercase required"}));
            }
            else if (!/[a-z]/.test(register.password)) {
                setError(prev =>({...prev , errPassword:true}));
                setErrmessage(prev=>({...prev, errPassword:"atleast 1 lowercase required"}));
            }
            else if (!/[0-9]/.test(register.password)) {
                setError(prev =>({...prev , errPassword:true}));
                setErrmessage(prev=>({...prev, errPassword:"atleast 1 number required"}));
            }
            else if (!/[!@#$%^&*]/.test(register.password)) {
                setError(prev =>({...prev , errPassword:true}));
                setErrmessage(prev=>({...prev, errPassword:"At least one special character required"}));
            }
            else {
                setError(prev =>({...prev , errPassword:false}));
                setErrmessage(prev=>({...prev, errPassword:""}));
            }


            if (
                !register.name || !register.email || !register.password || !register.email.endsWith('.com') || register.password.length < 8 || !/[A-Z]/.test(register.password)
                || !/[a-z]/.test(register.password) || !/[0-9]/.test(register.password) || !/[!@#$%^&*]/.test(register.password)) {
                return;
            }
            else{
            // const response=await api.post('/register/create',register);
            const response = await Api({
                        method: 'post',
                        endpoint: '/register/create',
                        data: register
                    })
        
            console.log('register',response)
            nav('/')
            console.log(register);

        }
        } catch(error){
            console.log(error)
            if (axios.isAxiosError(error)){
                
                {
                    console.log(error.response)
                    setError(prev => ({...prev,error:true}))
                    setErrmessage(prev=>({...prev, error:error.response?.data.message}));   
                    
                }
            }
            console.log("Error while sending data to backend")
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
                                        border: '1px solid rgba(24, 20, 20, 0.3)'}}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3}}>Registration Form</Typography>
                    <Stack spacing={4}>

                    <TextField 
                        fullWidth
                        id={error.errName? "standard-error":"standard-basic" }
                        variant="standard"
                        label="Name*"  
                        type='text' 
                        value={register.name} 
                        error={error.errName}
                        helperText={errmessage.errName }
                        onChange={(e)=> {setRegister({...register ,name:e.target.value});
                                        setError({...error , errName:false})
                                        setErrmessage({...errmessage, errName:""});}}/>
                    
                    <TextField 
                        fullWidth
                        id={error.errEmail ? "standard-error":"standard-basic" }
                        variant="standard"
                        label="Email*" 
                        type='text' 
                        error={error.errEmail }
                        value={register.email} 
                        helperText={errmessage.errEmail}
                        onChange={(e)=>{ setRegister({...register ,email:e.target.value}) ;
                                         setError({...error , errEmail:false});
                                         setErrmessage({...errmessage, errEmail:""});
                                        }} />
                        
                    <TextField 
                        fullWidth
                        id={error.errPassword ? "standard-error":"standard-basic" }
                        variant="standard"
                        label="Password*" 
                        type='password' 
                        value={register.password} 
                        error={error.errPassword}
                        helperText={errmessage.errPassword}
                        onChange={(e)=> { setRegister({...register ,password:e.target.value}); 
                                          setError({...error , errPassword:false});
                                          setErrmessage({...errmessage, errPassword:""});}}/>
                            

                    <TextField 
                        fullWidth
                        id="standard-basic" 
                        variant="standard"
                        type='text'
                        label="Phone" 
                        value ={register.phoneNumber} 
                        onChange={(e)=> setRegister({...register ,phoneNumber:e.target.value})}/>

                    <TextField 
                        fullWidth
                        id="standard-basic" 
                        variant="standard"
                        label="Address" 
                        type='text'  
                        value ={register.address} 
                        onChange={(e)=> setRegister({...register , address:e.target.value})}/>

                    <Button variant="contained" onClick={handleRegister} >Register</Button>
                     <Link   to="/" > <Typography  variant="body2" 
                                                        sx={{display:'flex' ,
                                                        justifyContent: 'center' ,
                                                        alignItems: 'center'}}>Already Registerd? Login</Typography></Link>


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
                        }}
                        >
                    </Snackbar>
        </>
    )
}