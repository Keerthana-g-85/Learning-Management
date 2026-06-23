import { useLocation } from "react-router-dom";
import { useState , useEffect } from "react"
import { Api } from '../components/Api'
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
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import PersonIcon from '@mui/icons-material/Person';

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

interface Students{
    id: string,
    name : string,
    email : string ,
    address : string,
    phoneNumber : string ,
    enroll_date : string
    role : string | null 
}
interface Course {
    id: string,
    register : Students 
    enroll_date : string
}
export default function Enroll(){
    const location = useLocation();
    const course = location.state.data;
    console.log(location.state.data);

    const [enroll, setEnroll] = useState([]);
    const [notenroll , setNotenroll] = useState([])

    
        const getEnroll =async () =>{
        try{
        const response = await Api({method : 'get' , endpoint:`enroll/getcourse/${course.id}`})
        const data = response.data.course_student
        setEnroll(data)
        }catch(error){
            console.log(error)
        }}; 
    
        const getUnenroll = async () =>{
        try{
        const response = await Api({method : 'get' , endpoint:`enroll/notenroll/${course.id}`})
        const data = response.data.notenroll
        setNotenroll(data)
        }catch(error){
            console.log(error)
        }}; 
    
        async function handleUnenroll(id:string){
            try{
                const response = await Api({method:'delete' , endpoint:`enroll/delete/${id}`})
                console.log(response)
                getEnroll()
                getUnenroll()
            }catch(error){
                console.log(error)
            }
        }

        async function handleEnroll(id:string){
            try{
                const response = await Api({method : 'post' , endpoint:`enroll/create/` ,data:{"register":`${id}` , "course":`${course.id}`}})
                console.log(response)
                getEnroll()
                getUnenroll()
            }catch(error){
                console.log(error)
            }
        }

         useEffect(()=>{ 
            getEnroll()
            getUnenroll()
        },[])

    return(
        <>
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
                    fontWeight: 700, }}>Enrolled Students</Typography>
                <Box sx={{
                px: 2,
                py: 0.5,
                bgcolor: "#0ea5e9",
                color: "white",
                borderRadius: 5,
                fontSize: "0.8rem",
                fontWeight: 600,}}> {enroll.length}</Box>
            </Box>
            <TableContainer component={Paper} sx={{p:2 , borderRadius: 1}} >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Email</StyledTableCell>
                    <StyledTableCell align="right">Phone Number</StyledTableCell>
                    <StyledTableCell align="right">Address</StyledTableCell>
                    <StyledTableCell align="right">Enroll Date</StyledTableCell>
                    <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {enroll.map((row :  Course) => (
                    <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                    <Box sx={{ display: "flex",
                             alignItems: "center",
                             gap: 1,}}>
                            <PersonIcon sx={{ fontSize: 20, color: '#0ea5e9' }} />
                            {row.register.name}
                    </Box></StyledTableCell>
                    <StyledTableCell align="right">{row.register.email}</StyledTableCell>
                    <StyledTableCell align="right">{row.register.phoneNumber }</StyledTableCell>
                    <StyledTableCell align="right">{row.register.address}</StyledTableCell>
                    <StyledTableCell align="right">{row.enroll_date}</StyledTableCell>
                    <StyledTableCell align="right"><Button color="error" variant="contained" sx={{ gap:1}}
                    onClick={() => handleUnenroll(row.id)}><GroupRemoveIcon/>Unenroll</Button></StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Paper>
    <Divider/>
    <Paper elevation={6} sx={{ mt: 5, 
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
                    fontWeight: 700, }}>Not Enrolled Students</Typography>
                <Box sx={{
                px: 2,
                py: 0.5,
                bgcolor: "#0ea5e9",
                color: "white",
                borderRadius: 5,
                fontSize: "0.8rem",
                fontWeight: 600,}}> {notenroll.length}</Box>
            </Box>

        <TableContainer component={Paper}sx={{p:2 , borderRadius: 1}} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Address</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {notenroll.map((row :  Students) => (
                <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                    <Box sx={{ display: "flex",
                             alignItems: "center",
                             gap: 1,}}>
                            <PersonIcon sx={{ fontSize: 20, color: '#0ea5e9' }} />
                    {row.name}
                    </Box>
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.phoneNumber }</StyledTableCell>
                <StyledTableCell align="right">{row.address}</StyledTableCell>
                <StyledTableCell align="right"><Button sx={{bgcolor:'#0ea5e9' , gap:1}} variant="contained" 
                 onClick={() => handleEnroll(row.id)}><GroupAddIcon /> Enroll </Button></StyledTableCell>
                
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </Paper>

        </>
    )
}