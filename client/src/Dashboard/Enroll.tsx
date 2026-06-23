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
import {Button, Divider} from '@mui/material'
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

    useEffect(()=>{
           const getCourse =async () =>{
            try{
            const response = await Api({method : 'get' , endpoint:`enroll/getcourse/${course.id}`})
            const data = response.data.course_student
            setEnroll(data)
        }catch(error){
            console.log(error)
        }}; getCourse()
        },[])
    
    useEffect(()=>{
           const getCourse =async () =>{
            try{
            const response = await Api({method : 'get' , endpoint:`enroll/notenroll/${course.id}`})
            const data = response.data.notenroll
            setNotenroll(data)
        }catch(error){
            console.log(error)
        }}; getCourse()
        },[])
    
        async function handleUnenroll(id:string){
            try{
                const response = await Api({method:'delete' , endpoint:`enroll/delete/${id}`})
                console.log(response)
            }catch(error){
                console.log(error)
            }
        }

        async function handleEnroll(id:string){
            try{
            const response = await Api({method : 'post' , endpoint:`enroll/create/` ,data:{"register":`${id}` , "course":`${course.id}`}})
            console.log(response)
            }catch(error){
                console.log(error)
            }

        }

    return(
        <>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
         <TableContainer component={Paper}>
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
                {row.register.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.register.email}</StyledTableCell>
              <StyledTableCell align="right">{row.register.phoneNumber }</StyledTableCell>
              <StyledTableCell align="right">{row.register.address}</StyledTableCell>
              <StyledTableCell align="right">{row.enroll_date}</StyledTableCell>
              <StyledTableCell align="right"><Button color="error" variant="contained"
               onClick={() => handleUnenroll(row.id)}>Unenroll</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Divider/>

        <TableContainer component={Paper}>
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
                    {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.phoneNumber }</StyledTableCell>
                <StyledTableCell align="right">{row.address}</StyledTableCell>
                <StyledTableCell align="right"><Button sx={{bgcolor: 'blue'}} variant="contained" 
                 onClick={() => handleEnroll(row.id)}>Enroll</Button></StyledTableCell>
                
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>

        </>
    )
}