import { useState } from "react"
import api from "./api";
import axios from 'axios'
import {useNavigate} from "react-router"
import { TextField ,Container, Paper, Typography , Stack, Button} from "@mui/material";

export default function Register (){
    const [register , setRegister] = useState({ Name :'' , Email: '' , Password: '' , PhoneNumber:'' , Address:''})
    const [error,setError] = useState(false)
    const [errstatus , setStatus] = useState(0)
    const nav = useNavigate()
     async function handleRegister(){
        try{
        if (!register.Name || !register.Email || !register.Password ){
            console.log("enter all the credentials")
            setError(true)
        }
        else{
            setError(false)
            const response=await api.post('/register/create',register);
            console.log(response)
            nav('/login')
            console.log(register);

        }
        } catch(error){
            if (axios.isAxiosError(error)){
                if (error.response?.status === 400){
                    setStatus(error.response.status)           
                }
            }
            console.log("Error while sending data to backend")
        }
        }
    return(
        <>
            <Container sx={{display:'flex' ,justifyContent: 'center' , alignItems: 'center'}}>
                <Paper elevation={4} sx={{ p: 5, mt: 5, borderRadius: 3 , width:500 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3}}>Registration Form</Typography>
                    <Stack spacing={4}>

                    <TextField 
                        fullWidth
                        id={error ? "standard-error":"standard-basic" }
                        variant="standard"
                        label="Name*"  
                        type='text' 
                        value={register.Name} 
                        error={error}
                        helperText={error ? "Name required": null }
                        onChange={(e)=> setRegister({...register ,Name:e.target.value})} />
                    
                    <TextField 
                        fullWidth
                        id={error ? "standard-error":"standard-basic" }
                        variant="standard"
                        label="Email*" 
                        type='text' 
                        error={error || errstatus > 0}
                        value={register.Email} 
                        helperText={error ? "Email required": errstatus === 400 ? "User already exist" :null   }
                        onChange={(e)=> setRegister({...register ,Email:e.target.value})} />
                    <TextField 
                        fullWidth
                        id={error ? "standard-error":"standard-basic" }
                        variant="standard"
                        label="Password*" 
                        type='text' 
                        value={register.Password} 
                        error={error}
                        helperText={error ? "Password required": null }
                        onChange={(e)=> setRegister({...register ,Password:e.target.value})}/>
                    <TextField 
                        fullWidth
                        id="standard-basic" 
                        variant="standard"
                        type='text'
                        label="Phone" 
                        value ={register.PhoneNumber} 
                        onChange={(e)=> setRegister({...register ,PhoneNumber:e.target.value})}/>
                    <TextField 
                        fullWidth
                        id="standard-basic" 
                        variant="standard"
                        label="Address" 
                        type='text'  
                        value ={register.Address} 
                        onChange={(e)=> setRegister({...register , Address:e.target.value})}/>

                    <Button variant="contained" onClick={handleRegister} >Register</Button>
                    </Stack>
                </Paper>
            </Container>
        </>
    )
}