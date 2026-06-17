import { useState } from "react"
import api from "./api";
import axios from 'axios'
import {useNavigate} from "react-router"
import { TextField ,Container, Paper, Typography , Stack, Button} from "@mui/material";

export default function Register (){

    const [Name ,setName] = useState('')
    const [Email ,setEmail] = useState('')
    const [Password ,setPassword] = useState('')
    const [PhoneNumber ,setPhone] = useState('')
    const [Address ,setAddress] = useState('')

    const register = {Name , Email , Password , PhoneNumber , Address}
    
    const [errName,setErrname] = useState(false)
    const [errEmail,setErremail] = useState(false)
    const [errPassword,setErrpassword] = useState(false)

    const [emailErrMessage , setEmailMessage] = useState('')
    const [passwordErrMessage , setPasswordMessage] = useState('')

    const [errstatus , setStatus] = useState(0)

    const nav = useNavigate()
     async function handleRegister(){
        try{
            if (!Name) {
                setErrname(true);
            } else {setErrname(false)}


            if (!Email) {
                setErremail(true)
                setEmailMessage("Email is required");
            } 
            else if (!Email.endsWith('@gmail.com')){
                setErremail(true)
                setEmailMessage("Email must end with @gmail.com")
            }
            else {
                setErremail(false)
                setEmailMessage('')
            }


            if (!Password) {
                setErrpassword(true);
                setPasswordMessage("Password is required");
            }
            else if (Password.length < 8) {
                setErrpassword(true);
                setPasswordMessage("atleast 8 characters required");
            }
            else if (!/[A-Z]/.test(Password)) {
                setErrpassword(true);
                setPasswordMessage("atleast 1 uppercase required");
            }
            else if (!/[a-z]/.test(Password)) {
                setErrpassword(true);
                setPasswordMessage("atleast 1 lowercase required");
            }
            else if (!/[0-9]/.test(Password)) {
                setErrpassword(true);
                setPasswordMessage("atleast 1 number required");
            }
            else if (!/[!@#$%^&*]/.test(Password)) {
                setErrpassword(true);
                setPasswordMessage("At least one special character required");
            }
            else {
                setErrpassword(false);
                setPasswordMessage("");
            }


            if (
                !Name || !Email || !Password || !Email.endsWith('@gmail.com') || Password.length < 8 || !/[A-Z]/.test(Password)
                || !/[a-z]/.test(Password) || !/[0-9]/.test(Password) || !/[!@#$%^&*]/.test(Password)) {
                return;
            }
            else{
            const response=await api.post('/register/create',register);
            console.log(response)
            nav('/login')
            console.log(register);

        }
        } catch(error){
            if (axios.isAxiosError(error)){
                {
                    setStatus(error.response?.status || 0)           
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
                        id={errName ? "standard-error":"standard-basic" }
                        variant="standard"
                        label="Name*"  
                        type='text' 
                        value={Name} 
                        error={errName}
                        helperText={errName ? "Name required" : null }
                        onChange={(e)=> setName(e.target.value)} />
                    
                    <TextField 
                        fullWidth
                        id={errEmail ? "standard-error":"standard-basic" }
                        variant="standard"
                        label="Email*" 
                        type='text' 
                        error={errEmail || errstatus > 0}
                        value={Email} 
                        helperText={emailErrMessage || (errstatus === 400 ? "User already exists" : null)}
                        onChange={(e)=> setEmail(e.target.value)} />
                        
                    <TextField 
                        fullWidth
                        id={errPassword ? "standard-error":"standard-basic" }
                        variant="standard"
                        label="Password*" 
                        type='password' 
                        value={Password} 
                        error={errPassword}
                        helperText={passwordErrMessage}
                        onChange={(e)=> {setPassword(e.target.value) ; 
                            setErrpassword(false);}}/>

                    <TextField 
                        fullWidth
                        id="standard-basic" 
                        variant="standard"
                        type='text'
                        label="Phone" 
                        value ={PhoneNumber} 
                        onChange={(e)=> setPhone(e.target.value)}/>

                    <TextField 
                        fullWidth
                        id="standard-basic" 
                        variant="standard"
                        label="Address" 
                        type='text'  
                        value ={Address} 
                        onChange={(e)=> setAddress(e.target.value)}/>

                    <Button variant="contained" onClick={handleRegister} >Register</Button>
                    <Button variant="contained" onClick={()=>nav('/login')} >Login</Button>

                    </Stack>
                </Paper>
            </Container>
        </>
    )
}