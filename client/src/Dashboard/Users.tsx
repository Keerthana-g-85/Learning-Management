import { useEffect, useState  } from "react"
import {Api} from '../components/Api'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save'
import { TextField } from "@mui/material";

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

interface Users{
    id : string ,
    name : string,
    email : string ,
    address : string,
    phoneNumber : string ,
    role : string | null 
}

export default function User(){
    const [user , setUser] = useState([])
    const [edit , setEdit] = useState<Users | null>(null)
    useEffect(()=>{
        const getStudent = async()=>{
            try{
                const response = await Api({method:'get' , endpoint:'/register/get'})
                console.log(response)
                setUser(response.data.user)
            }catch(error){
                console.log(error)
            }
        }
        getStudent()
    },[])
    async function handleSave(){
      if (edit === null) { return }
      const response = await Api({method : 'put' ,endpoint :`/register/update/${edit?.id}` , data: edit })
      console.log(response)
      const getresponse = await Api({method:'get' , endpoint:'/register/get'})
      setUser(getresponse.data.user)
      setEdit(null)
    }
    return(
        <>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((row: Users) => (
            <StyledTableRow key={row.id}>
              
              <StyledTableCell component="th" scope="row">
                {edit?.id === row?.id ?
                <TextField size="small" id="standard-basic" variant="standard" 
                value={edit.name} onChange={(e)=>setEdit({...edit, name:e.target.name})}/>:
                row.name}
              </StyledTableCell>

              <StyledTableCell align="right">
                {edit?.id === row.id ?
                (<TextField size="small" id="standard-basic" variant="standard"
                value={edit.email} onChange={(e) => setEdit({ ...edit, email: e.target.value, })}/>):
                row.email}
              </StyledTableCell>

              <StyledTableCell align="right">
                {edit?.id === row.id ? 
                <TextField size="small" id="standard-basic" variant="standard" 
                value={edit.phoneNumber} onChange={(e)=>setEdit({...edit, phoneNumber:e.target.value})}/>:
                row.phoneNumber }
              </StyledTableCell>

              <StyledTableCell align="right">
                {edit?.id === row?.id ?
                <TextField size="small" id="standard-basic" variant="standard" 
                value ={edit.address} onChange={(e)=>setEdit({...edit, address:e.target.value})}/>:
                row.address}
              </StyledTableCell>

              <StyledTableCell align="right">
                  {edit?.id === row?.id ? 
                  <TextField size="small" id="standard-basic" variant="standard" 
                  value={edit.role} onChange={(e)=>setEdit({...edit, role:e.target.value})} />:
                  row.role}
              </StyledTableCell>

              <StyledTableCell align="right">
                {
                  edit?.id === row.id ? (
                    <SaveIcon onClick={() => handleSave()} />
                  ) : (
                    <EditIcon onClick={() => setEdit(row)} />
                  )
                }
                <DeleteIcon/>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    </>
    )
}

