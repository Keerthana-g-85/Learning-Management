import { useState , useEffect } from 'react';
import {Box , Chip} from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Divider from "@mui/material/Divider";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import {AccessTime} from '@mui/icons-material'
import {Api} from '../components/Api'
export default function Courses(){

    const [course , setCourse] = useState([])
    useEffect(()=>{
       const getCourse =async () =>{
        try{
        const response = await Api({method : 'get' , endpoint:'course/getall'})
        const data = response.data.AllCourses
        setCourse(data)
    }catch(error){
        console.log(error)
    }}; getCourse()
    },[])


    return(
            <>
            <Box sx={{ display:'flex' , gap:5 ,  flexWrap: 'wrap',}}>
            {course.map ((data)=>{ return(
                < div key={data.id}>
                    <Card sx={{ width: 450 , 
                        borderRadius:5 , 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                        background:"linear-gradient(135deg, #0f172a 0%, #0b1220 100%)",
                        border:'1px solid #1e2224',
                        transition: "0.3s",
                        "&:hover": {
                        transform: "translateY(-8px)",},
                        color: 'white',}}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="280"
                            sx={{p:1 , borderRadius:5}}
                            image={data.thumbnail}/>

                        <CardContent sx={{ p: 4 }}>
                            <Chip label={data.level.toUpperCase()}
                            sx={{ bgcolor: "#0ea5e9",
                            color: "white",
                            fontWeight: 700,
                            mb: 1 }} />
                    
                        <Typography sx={{ fontSize: "2rem",
                            fontWeight: 700,
                            fontFamily: "Outfit, sans-serif",
                            mb: 1}} >
                            {data.title}
                        </Typography>

                        <Typography sx={{
                            color: "#94a3b8",
                            fontSize: "1rem",
                            lineHeight: 1.6,
                            minHeight: 70,}}>
                        {data.description}
                        </Typography>
                         <Divider sx={{ color :'grey'}}/>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb:2
                            }}>
                            <Typography sx={{ fontWeight: 600,
                                display: "flex",
                                flex: 1,
                                alignItems: "center",
                                gap: 1,
                                color:"#94a3b8"
                            }}>
                                <CoPresentIcon/>
                                {data.instructor_name}
                            </Typography>
                            <Divider orientation="vertical" flexItem sx={{
                                bgcolor: "rgba(255, 255, 255, 0.63)" ,
                                size:'large'}} />
                            <Typography sx={{
                                display: "flex",
                                alignItems: "center",
                                flex: 1,
                                gap: 1,
                                fontWeight: 600,
                                color:"#94a3b8"}}>
                                <AccessTime sx={{color:"#0ea5e9"}}/> {data.duration} 
                            </Typography>
                        </Box>
                        
                <Box  sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            bm:1,
                             }}>
                    <Button variant="outlined" sx={{ color: 'orange' , display: "flex",
                                flex: 1,
                                alignItems: "center",
                                gap: 1,
                                border:'1px solid blue'
                                }} startIcon={<EditIcon />}>  Edit</Button>
                    <Button variant="outlined" sx={{ color: 'red' ,display: "flex",
                                flex: 1,
                                alignItems: "center",
                                gap: 1 , border:'1px solid red' }} startIcon={<DeleteIcon />}> Delete</Button>
                </Box>
               </CardContent>
                </Card>
                </div>)})
            }
            </Box>
        </>
    )
}

