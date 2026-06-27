import { useState , useEffect } from 'react';
import { useNavigate  } from "react-router"
import { useSelector } from "react-redux";

import useApi from '../components/Api'
import useDebounce from '../components/Debounce';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CoPresentIcon from '@mui/icons-material/CoPresent';

interface Courses {
    id : string ,
    title : string ,
    description : string ,
    instructor_name: string ,
    duration : string ,
    thumbnail : string ,
    level : string,
    name:string
}

export default function Courses(){

    const [course , setCourse] = useState<Courses[]>([])
    const [page, setPage] = useState<number>(1);
    const [filter , setFilter] = useState<string[]>([])
    const [instructor , setInstructor] = useState<string[]>([])
    const [message , setMessage] = useState<string>('')
    const [open, setOpen] = useState<string>('');
    const [searchdata , setSearchdata] = useState<Courses[]>([])
    const [filterdata , setFilterdata] = useState<Courses[]>([])

    const { Api } = useApi();
    
    const nav = useNavigate()

    const search = useSelector((state: any) => state.search.search);
    const debounce = useDebounce(search)

    // pagination
    const per_page = 6
    const intial = (page - 1 )* per_page
    const final = page * per_page    
    const total_page = Math.ceil(course.length / per_page)
    const currentPage = course.slice (intial , final)

    // Getting all the course 
    const getCourse = async () =>{
        try{
            const response = await Api({method : 'get' , endpoint:'course/getall'})
            const data = response.data.AllCourses
            setCourse(data)
            setMessage(response.data.message)
        }catch(error){
            console.log(error)
        }
    }; 

    useEffect(()=>{
        getCourse()
    },[])

    // delete the course 
    async function handleDelete(id : string){
        console.log(id)
            try{
                const deleteResponse = await Api ({method :'delete',endpoint:'/course/delete/'+`${id}` })
                console.log('/course/delete/'+`${id}`)
                const response = await Api({method : 'get' , endpoint:'course/getall'})
                const data = response.data.AllCourses
                setMessage(deleteResponse.data.message)
                setCourse(data)
                setOpen('')
            }catch(error){
                console.log(error)
            }
    };

    // search 
    const searchTitle = async() =>{
        try{
            if(debounce.trim() !==''){
                const response = await Api({method:'get', endpoint:`/course/get/${debounce}` })
                console.log('search',response.data.course)
                const data = response.data.course
                setSearchdata(data)
                
            }else{
                    getCourse()
            }   
        }catch(error){
            console.log(error)
        }
    }; 

    useEffect(() => {
        searchTitle()
    },[debounce])

    // Pagination 
    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        e.preventDefault()
        setPage(value);
    };

    // Instructor name fetching for filter
    const instructorName = async () => { 
        const response = await Api({method:'get' , endpoint:'/register/getinstructor'})
        console.log(response.data.instructor);
        const name=(response.data.instructor).map((data:Courses)=>data.name)
        console.log(name)
        setInstructor(name)
    }; 

    useEffect(()=>{
        instructorName()
    },[])

    function handleFilter(data:string){
        if (filter.includes(data)){
            const filtered = filter.filter((item)=>item !== data)
            setFilter(filtered)
        }
        else{
             setFilter([...filter, data]);
        }
    }

    const filterCourse = async ()=>{
        const response = await Api({method:'get' , endpoint :`/course/filter/${filter.join(',')}` })
        console.log(response.data.courses)
        const data=response.data.courses
        setFilterdata(data)
    }

    useEffect(() => {
        filterCourse()
    },[filter])

    useEffect(()=>{
        if (debounce && filter.length > 0){
            const common  = searchdata.filter(course =>
            filterdata.some(filter => filter.id === course.id));
            setCourse(common)
        }
        else if (debounce){
            setCourse(searchdata)
        }
        else if(filter.length > 0) {
            setCourse(filterdata)
        }
         else {
            getCourse();
        }
    },[filterdata , searchdata , debounce , filter])

    return(
        <>
            <Box sx={{ display:'flex' , height:'80px' , justifyContent:'right'}}>
                {instructor.map((data , index )=>
                    <>
                        <FormGroup  key={index}>
                            <FormControlLabel control={<Checkbox checked={filter.includes(data)}
                            onChange={()=>handleFilter(data)}/>} label={data} />
                        </FormGroup>
                    </>
                )}
            </Box>
            
            <Box sx={{ display:'flex' , gap:5 ,  flexWrap: 'wrap',}}>
                {currentPage.map ((data : Courses)=>{ return(
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
                            color: 'white'
                            }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="180"
                            sx={{p:1 , borderRadius:5}}
                            image={data.thumbnail}/>
                            <Button
                                variant="contained"
                                sx={{
                                    position: "absolute",
                                    top: 12,
                                    right: 12,
                                    borderRadius: 3,
                                    textTransform: "none",
                                    fontSize: "1 rem",
                                    fontWeight: 700,
                                    bgcolor: "#fefefe",
                                    color:'#0ea5e9'}}
                                onClick={()=>{nav(`/courses/enroll/${data.id}` , {state:{data}})}}>Enroll</Button>

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
                            mb:2}}>

                            <Typography sx={{ fontWeight: 600,
                                display: "flex",
                                flex: 1,
                                alignItems: "center",
                                gap: 1,
                                color:"#94a3b8"}}>
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
                                <AccessTimeIcon sx={{color:"#0ea5e9"}}/> 
                                {data.duration} 
                            </Typography>
                        </Box>
                        
                        <Box  sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb:1}}>

                            <Button variant="outlined" 
                                sx={{ color: "#ef5252",
                                display: "flex",
                                flex: 1,
                                alignItems: "center",
                                gap: 1 ,
                                border:'1px solid #ef5252' }} 
                                startIcon={<DeleteIcon />} 
                                onClick={(e)=>{e.preventDefault();
                                    setOpen(data.id);}}> Delete
                            </Button>
                    
                        </Box>
                        </CardContent>
                        </Card>
                    </div>
                )})}
            </Box>

            <Dialog open={Boolean(open)} onClose={() => setOpen('')}>
                <DialogTitle>Delete Course </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to Delete course
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button variant="contained"
                        sx={{bgcolor:"#626769" , 
                        color:'white'}} 
                        onClick={() => setOpen('')}> Cancel
                    </Button>
                    <Button variant="contained" 
                        sx={{ bgcolor: "#ef5252" ,
                            display: "flex",
                            border:'1px solid #ef5252' }}  startIcon={<DeleteIcon />} 
                            onClick={()=>handleDelete(open)}> "Delete"
                    </Button>
                </DialogActions>
            </Dialog>

            <Box sx={{display:'flex' ,justifyContent:'center' , p:9 }}>
                <Stack spacing={2}>
                    <Pagination count={total_page} 
                        page={page} 
                        onChange={handleChange}  
                        sx={{'& .MuiPaginationItem-root': {
                        fontSize: '1.6rem',    
                        height: '4rem',      
                        minWidth: '4rem',  
                        }}} />
                </Stack>
            </Box>
        
            <Snackbar open={Boolean(message)}
                autoHideDuration={3000}
                message ={message}
                onClose={() => setMessage('')}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'}}/>
        </>
    )
}

