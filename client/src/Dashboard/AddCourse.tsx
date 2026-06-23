import { useState } from 'react'
import type{FormEvent} from 'react'
import axios from 'axios'
import {Api} from '../components/Api'
import { TextField ,Box, Paper, Typography , Stack, Button , FormHelperText} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AddCourse(){
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
        <Box  sx={{display:'flex' ,
                            justifyContent: 'center' , 
                            alignItems: 'center' , 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'center',
                            width: '100%',
                            mt:6
                            }}>
            <Paper elevation={4} sx={{ p: 3, 
                                       
                                        borderRadius: 3 , 
                                        width:600,
                                        backgroundColor: 'rgba(255, 252, 252, 0.76)', 
                                        backdropFilter: 'blur(12px)',
                                        border: '1px solid rgba(217, 209, 209, 0.3)'}}>
                <form onSubmit={handleClick}>
                <Stack spacing={4}>
                    
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3}}>Add Course</Typography>
            <TextField id={error ? "outlined-error" : "outlined-basic"}
                       fullWidth
                       label="Title" 
                       variant="outlined" 
                       error = {error.title}
                       sx={{  }}
                       value={course.title}
                       helperText={errmessage.title}
                       onChange={(e)=>{setCourse({...course ,title : e.target.value})
                       setError({...error , title:false})
                       setMessage(prev => ({...prev , title:""}))}}/>

            <TextField id="outlined-multiline-flexible"
                       fullWidth
                       label="Description"
                       multiline
                       maxRows={4} 
                       sx={{  }}
                       value={course.description}
                       error = {error.description}
                       helperText={errmessage.description}
                       onChange={(e)=>{setCourse({...course ,description : e.target.value})
                       setError({...error , description:false})
                       setMessage(prev => ({...prev , description:""}))}}/>

            <TextField id="outlined-basic" 
                       fullWidth
                       label="Instructor Name" 
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
                       label="Duration" 
                       variant="outlined" 
                       sx={{ }}
                       value={course.duration}
                       error = {error.duration}
                       helperText={errmessage.duration}
                       onChange={(e)=>{setCourse({...course ,duration : e.target.value})
                       setError({...error , duration:false})
                       setMessage(prev => ({...prev , duration:""}))}}/>

            <FormControl fullWidth>
                <InputLabel error={error.level} >Level</InputLabel>
                <Select
                    fullWidth
                    value={course.level}
                    label="Level"
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
                       label="Thumbnail" 
                       variant="outlined" 
                       sx={{ }}
                       value={course.thumbnail}
                       error = {error.thumbnail}
                       helperText={errmessage.thumbnail}
                       onChange={(e)=>{setCourse({...course , thumbnail : e.target.value})
                       setError({...error , thumbnail:false})
                       setMessage(prev => ({...prev , thumbnail:""}))}}/>
            <Button variant="contained" type="submit">Add</Button>
            </Stack>
             </form>
                
            </Paper>
        </Box>
        </>
    )
}