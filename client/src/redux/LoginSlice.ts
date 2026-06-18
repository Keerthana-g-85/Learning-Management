import {createSlice} from '@reduxjs/toolkit'


const initialState ={
    token:''
} 

const loginSlice = createSlice({
    name : 'login' ,
    initialState , 
    reducers :{
        addToken :(state , action ) =>{
            state.token = action.payload
        }

    }
})
export const {addToken} = loginSlice.actions

export default loginSlice.reducer