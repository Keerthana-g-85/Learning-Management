import { useState } from "react"
import axios from "axios";

export default function Register (){
    const [register , setRegister] = useState({ Name :'' , Email: '' , Password: '' , PhoneNumber:'' , Address:''})
     async function handleRegister(){
        try{
        if (!register.Name || !register.Email || !register.Password || !register.PhoneNumber || !register.Address){
            console.log("enter all the credentials")
            alert("Enter all credentials")
        }
        else{
        console.log(register);
        await axios.post('http://localhost:3000/register/create',register)
        }
        } catch(error){
            console.log(error)
            console.log("Error while sending data to backend")
        }
        }
    return(
        <>
            Name : <input type='text' value={register.Name} onChange={(e)=> setRegister({...register ,Name:e.target.value})} />
            Email : <input type='text' value={register.Email} onChange={(e)=> setRegister({...register ,Email:e.target.value})} />
            Password : <input type='text' value={register.Password} onChange={(e)=> setRegister({...register ,Password:e.target.value})}/>
            Phone : <input type='text' value ={register.PhoneNumber} onChange={(e)=> setRegister({...register ,PhoneNumber:e.target.value})}/>
            Address : <input type='text' value ={register.Address} onChange={(e)=> setRegister({...register , Address:e.target.value})}/>

            <button onClick={handleRegister}>Register</button>
        </>
    )
}