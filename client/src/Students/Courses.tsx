import { useState , useEffect } from 'react';
import {Box , Chip , Snackbar} from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import {AccessTime} from '@mui/icons-material'
import useApi from '../components/Api'
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

interface Courses {
    id : string ,
    title : string ,
    description : string ,
    instructor_name: string ,
    duration : string ,
    thumbnail : string ,
    level : string 
}
export default function Courses(){

    const user = useSelector((state: any) => state.login.user);

    const [open, setOpen] = useState('');
    const [course , setCourse] = useState([])
    const [message , setMessage] = useState('')
    const { Api } = useApi();
    // const [progress, setProgress] = useState(false);

    useEffect(()=>{
       const getCourse =async () =>{
        try{
        const response = await Api({method : 'get' , endpoint:'course/getall'})
        const data = response.data.AllCourses
        setCourse(data)
        setMessage(response.data.message)
    }catch(error){
        console.log(error)
    }}; getCourse()
    },[])
    console.log()

    async function handleEnroll(id:string){
        console.log(id)
            try{
                const response = await Api({method : 'post' , endpoint:`enroll/create/` ,data:{"register":`${user.id}` , "course":`${id}`}})
                console.log(response)
                setOpen('')
            }catch(error){
                console.log(error)
            }
            
        }
        
    return(
            <>
            
            <Box sx={{ display:'flex' , gap:5 ,  flexWrap: 'wrap',}}>
            {course.map ((data : Courses)=>{ return(
                < div key={data.id}>
                    <Card sx={{ width: 450 , 
                        position: "relative",
                        borderRadius:5 , 
                        boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                        background:"#010102",
                        border:'1px solid #1e2224',
                        transition: "0.3s",
                        "&:hover": {
                        transform: "translateY(-8px)",},
                        color: 'white',}}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="180"
                            sx={{p:1 , borderRadius:5}}
                            image={data.thumbnail}/>
                        <CardContent sx={{ pl:2 , pt:1 }}>
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
                    <Button variant="outlined" sx={{  display: "flex",
                                flex: 1,
                                alignItems: "center",
                                gap: 1,
                                bgcolor:"#0ea5e9",
                                color:"white",
                                }} 
                                onClick={()=>setOpen(data.id)} > Enroll</Button>   
                </Box>
               </CardContent>
                </Card>
                </div>)})
            }
            <Dialog open={Boolean(open)} onClose={() => setOpen('')}>
            <DialogTitle> Add Course </DialogTitle>
            <DialogContent>
                <DialogContentText>
                Are you sure you want to Add course?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen('')} sx={{bgcolor:"#626769" , color:'white'}} > Cancel</Button>
                <Button variant="contained" sx={{bgcolor:"#0ea5e9"}} onClick={()=>{handleEnroll(open)}}>Enroll</Button>
            </DialogActions>
            </Dialog>
            </Box>
        
        <Snackbar
            open={Boolean(message)}
            autoHideDuration={3000}
            message ={message}
            onClose={() => setMessage('')}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}/>
        </>
    )
}

