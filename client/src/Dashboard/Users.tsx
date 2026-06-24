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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PeopleIcon from "@mui/icons-material/People";
import { Box, Typography} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
  const { Api } = useApi();
    const [user , setUser] = useState([])
    const [edit , setEdit] = useState<Users | null>(null)
    useEffect(()=>{
        const getUsers = async()=>{
            try{
                const response = await Api({method:'get' , endpoint:'/register/get'})
                console.log(response)
                setUser(response.data.user)
            }catch(error){
                console.log(error)
            }
        }
        getUsers()
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
                    fontWeight: 700, }}>Users</Typography>
            </Box>
        <TableContainer component={Paper} sx={{p:2 , borderRadius: 1}} >
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
                <Box sx={{ display: "flex",
                             alignItems: "center",
                             gap: 1,}}>
                            <AccountCircleIcon sx={{ fontSize: 20, color: '#0ea5e9' }} />
                    {row.name}
                    </Box>
              </StyledTableCell>

              <StyledTableCell align="right">
                { row.email}
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.phoneNumber }
              </StyledTableCell>

              <StyledTableCell align="right">
                {row.address}
              </StyledTableCell>

              <StyledTableCell align="right">
                  {edit?.id === row?.id ? 
                <FormControl >
                <Select
                    value={edit.role}
                    onChange={(e)=>setEdit({...edit, role:e.target.value})}>
                    <MenuItem value={'instructor'}> Instructor</MenuItem>
                    <MenuItem value={'student'}>Student</MenuItem>
                </Select>
                </FormControl>:
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
    </Paper>
    </>
    )
}

