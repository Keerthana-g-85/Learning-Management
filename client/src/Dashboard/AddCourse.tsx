import { useState } from 'react'
import type{FormEvent} from 'react'
import axios from 'axios'
import {Api} from '../components/Api'
import { TextField ,Box, Paper, Typography , Stack, Button , FormHelperText} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate  } from "react-router"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CssBaseline from '@mui/material/CssBaseline';
import image3 from '../assets/image2.png'

export default function AddCourse(){
    const nav = useNavigate()
    const [course , setCourse] = useState({title : '' , description : '' , instructor_name:'' , duration:'' ,level:'' , thumbnail:''})
    const [error , setError] = useState({title : false , description : false , instructor_name: false , duration: false ,level: false  , thumbnail: false})
    const [errmessage , setMessage] = useState({title : '' , description : '' , instructor_name:'' , duration:'' ,level:'' , thumbnail:''})

    async function handleClick(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        try{
            if (!course.title){
                setError(prev => ({...prev , title:true}))
                setMessage(prev => ({...prev , title:"Title is required"}))
            }
            if (!course.description){
                setError(prev => ({...prev , description:true}))
                setMessage(prev => ({...prev , description:"Description is required"}))
            }
            if (!course.instructor_name){
                setError(prev => ({...prev , instructor_name:true}))
                setMessage(prev => ({...prev , instructor_name:"Instuctor Name is required"}))
            }
            if (!course.duration){
                setError(prev => ({...prev , duration:true}))
                setMessage(prev => ({...prev , duration:"Duration is required"}))
            }
             if (!course.level){
                setError(prev => ({...prev , level:true}))
                setMessage(prev => ({...prev , level:"Level is required"}))
            }
             if (!course.thumbnail){
                setError(prev => ({...prev , thumbnail:true}))
                setMessage(prev => ({...prev , thumbnail:"Thumbnail is required"}))
            }

            const response = await Api({method : 'post' , endpoint:'/course/create' , data : course})
            console.log(response)
            }catch(error){
                if (axios.isAxiosError(error)){
                console.log(error)
                console.log(error.response?.data.message)
                }
            }
            console.log(course)
            setCourse({title : '' , description : '' , instructor_name:'' , duration:'' ,level:'' , thumbnail:''})
    }
    
    return(
        <>
        <CssBaseline />
        <Box sx={{width:'100%',height:'90vh' , bgcolor:'black' , p:0, margin: 0,overflow: 'auto' , backgroundImage:`url(${image3})`,backgroundSize: 'cover', 
                            backgroundPosition: 'center',}}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start',p:4 }}>
            <Button  variant="contained" sx={{ 
                                bgcolor:"#0ea5e9",
                                borderRadius: 2,
                                width:'100px',
                                gap:1
                                }} onClick ={()=> nav('/courses')}><ArrowBackIcon/>Back</Button>
            </Box>
        <Box  sx={{display:'flex' ,
                            justifyContent: 'center' , 
                            alignItems: 'center' , 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center',
                            }}>
            <Paper elevation={4} sx={{ p: 3, mt:3,
                                        bgcolor:'#f5f7f9',
                                        borderRadius: 3 , 
                                        width:'100%',
                                        maxWidth: 1100,
                                        height: '600px',
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(217, 209, 209, 0.3)'}}>
                <form onSubmit={handleClick}>
                <Stack spacing={4}>
                    
                    <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#1e293b"}}> Add Course </Typography>
                    </Box>
            <TextField id={error ? "outlined-error" : "outlined-basic"}
                       fullWidth
                       label="Title*" 
                       variant="outlined" 
                       error = {error.title}
                       
                       value={course.title}
                       helperText={errmessage.title}
                       onChange={(e)=>{setCourse({...course ,title : e.target.value})
                       setError({...error , title:false})
                       setMessage(prev => ({...prev , title:""}))}}/>

            <TextField id="outlined-multiline-flexible"
                       fullWidth
                       label="Description*"
                       multiline
                       rows={4} 
                       sx={{  }}
                       value={course.description}
                       error = {error.description}
                       helperText={errmessage.description}
                       onChange={(e)=>{setCourse({...course ,description : e.target.value})
                       setError({...error , description:false})
                       setMessage(prev => ({...prev , description:""}))}}/>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3,}}>

            <TextField id="outlined-basic" 
                       fullWidth
                       label="Instructor Name*" 
                       variant="outlined" 
                       sx={{  }}
                       value={course.instructor_name}
                       error = {error.instructor_name}
                       helperText={errmessage.instructor_name}
                       onChange={(e)=>{setCourse({...course ,instructor_name : e.target.value})
                       setError({...error , instructor_name:false})
                       setMessage(prev => ({...prev , instructor_name:""}))}}/>

            <TextField id="outlined-basic" 
                       fullWidth
                       label="Duration*" 
                       variant="outlined" 
                       sx={{ }}
                       value={course.duration}
                       error = {error.duration}
                       helperText={errmessage.duration}
                       onChange={(e)=>{setCourse({...course ,duration : e.target.value})
                       setError({...error , duration:false})
                       setMessage(prev => ({...prev , duration:""}))}}/>

            <FormControl fullWidth>
                <InputLabel error={error.level} >Level*</InputLabel>
                <Select
                    fullWidth
                    value={course.level}
                    label="Level*"
                    error = {error.level}
                    onChange={(e)=>{setCourse({...course , level : e.target.value})
                       setError({...error , level:false})
                       setMessage(prev => ({...prev , level:""}))}}>
                    <MenuItem value={'beginner'}> Beginner</MenuItem>
                    <MenuItem value={'intermediate'}>Intermediate</MenuItem>
                    <MenuItem value={'advanced'}>Advanced</MenuItem>
                </Select>
                <FormHelperText error={error.level}>{errmessage.level}</FormHelperText>
                </FormControl>

            <TextField id="outlined-basic" 
                       fullWidth
                       label="Thumbnail*" 
                       variant="outlined" 
                       sx={{ }}
                       value={course.thumbnail}
                       error = {error.thumbnail}
                       helperText={errmessage.thumbnail}
                       onChange={(e)=>{setCourse({...course , thumbnail : e.target.value})
                       setError({...error , thumbnail:false})
                       setMessage(prev => ({...prev , thumbnail:""}))}}/>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", }}>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{
                    bgcolor:"#0ea5e9",
                    borderRadius: 2,
                    }}
                    onClick={()=>{nav('/courses')}}>
                    Add Course
                </Button>
                </Box>
            </Stack>
             </form>
                
            </Paper>
        </Box>
        </Box>
        </>
    )
}