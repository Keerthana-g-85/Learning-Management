import { useEffect, useState  } from "react"
import useApi from '../components/Api'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PeopleIcon from "@mui/icons-material/People";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { Box, Typography} from '@mui/material'

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
interface Instructor{
    name : string,
    email : string ,
    address : string,
    phoneNumber : string ,
    role : string | null 
}
export default function Instructor(){
    const [instructor , setInstructor] = useState([])
    const { Api } = useApi();
    useEffect(()=>{
        const getInstructor = async()=>{
            try{
                const response = await Api({method:'get' , endpoint:'/register/getinstructor'})
                console.log(response)
                setInstructor(response.data.instructor)
            }catch(error){
                console.log(error)
            }
        }
        getInstructor()
    },[])
    return(
        <>
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
                    fontWeight: 700, }}>Instructor</Typography>
            </Box>
        <TableContainer component={Paper} sx={{p:2 , borderRadius: 1}} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instructor.map((row:Instructor) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                <Box sx={{ display: "flex",
                             alignItems: "center",
                             gap: 1,}}>
                            <CoPresentIcon sx={{ fontSize: 20, color: '#0ea5e9' }} />
                    {row.name}
                    </Box>
              </StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.phoneNumber }</StyledTableCell>
              <StyledTableCell align="right">{row.address}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    </Paper>
    </>
    )
}

