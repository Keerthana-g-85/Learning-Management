import { useState } from "react"
export default function Register (){
    const [register , setRegister] = useState({ Name :'' , Email: '' , Password: '' , PhoneNumber:'' , Address:''})
    function handleRegister(){
        if (!register.Name || !register.Email || !register.Password || !register.PhoneNumber || !register.Address){
            console.log("enter all the credentials")
        }
        else{
        console.log(register);
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