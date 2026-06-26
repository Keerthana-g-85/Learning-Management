import { useState , useEffect } from "react"
import useApi from '../components/Api'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Divider , Box, Typography} from '@mui/material'
import PeopleIcon from "@mui/icons-material/People";
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from "react-redux";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Course{
    id : string ,
    title : string ,
    description : string ,
    duration : string ,
    level : string ,
    instructor_name : string
}
interface Student {
    id: string,
    course : Course
    enroll_date : string
}
export default function Enroll(){
    const { Api } = useApi();
    const id = useSelector((state:any)=>state.login.user.id)
    console.log(id)
    const [enroll, setEnroll] = useState([]);

    
        const getEnroll =async () =>{
        try{
        const response = await Api({method : 'get' , endpoint:`enroll/getstudent/${id}`})
        const data = response.data.student_course
        setEnroll(data)
        console.log(data)
        }catch(error){
            console.log(error)
        }}; 
    useEffect(()=>{getEnroll()
    },[])

    async function handleUnenroll(id:string){
            try{
                const response = await Api({method:'delete' , endpoint:`enroll/delete/${id}`})
                console.log(response)
                getEnroll()
               
            }catch(error){
                console.log(error)
            }
        }
    

    return(
        <>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start',p:1 }}>
            
                               
            </Box>
        <Paper elevation={6} sx={{ mt: 2, 
            borderRadius: 2,
            boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
            }}>
            <Box sx={{ p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    }}>
                <PeopleIcon sx={{ color: "#0ea5e9" }} />
                <Typography  variant="h6" sx={{
                    fontWeight: 700, }}>Enrolled  Courses</Typography>
                <Box sx={{
                px: 2,
                py: 0.5,
                bgcolor: "#0ea5e9",
                color: "white",
                borderRadius: 5,
                fontSize: "0.8rem",
                fontWeight: 600,}}>{enroll.length} </Box>
            </Box>
            <TableContainer component={Paper} sx={{p:2 , borderRadius: 1}} >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell align="right">Description</StyledTableCell>
                    <StyledTableCell align="right">Instructor Name</StyledTableCell>
                    <StyledTableCell align="right">Level</StyledTableCell>
                    <StyledTableCell align="right">Duration</StyledTableCell>
                    <StyledTableCell align="right">Enroll Date</StyledTableCell>
                    <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {enroll.map((row :  Student) => (
                    <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                    <Box sx={{ display: "flex",
                             alignItems: "center",
                             gap: 1,}}>
                            <PersonIcon sx={{ fontSize: 20, color: '#0ea5e9' }} />
                            {row.course.title}
                    </Box></StyledTableCell>
                    <StyledTableCell align="right">{row.course.description}</StyledTableCell>
                    <StyledTableCell align="right">{row.course.instructor_name }</StyledTableCell>
                    <StyledTableCell align="right">{row.course.level}</StyledTableCell>
                    <StyledTableCell align="right">{row.course.duration}</StyledTableCell>
                    <StyledTableCell align="right">{row.enroll_date}</StyledTableCell>
                    <StyledTableCell align="right">
                        <Button color="error" variant="contained" sx={{ gap:1}}
                    onClick={()=>handleUnenroll(row.id)}
                    ><GroupRemoveIcon/>Unenroll</Button></StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
    <Divider/>
    </>
    )
}