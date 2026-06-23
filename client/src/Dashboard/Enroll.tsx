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
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
}