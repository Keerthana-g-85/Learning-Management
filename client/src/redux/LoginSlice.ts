import {createSlice} from '@reduxjs/toolkit'


const initialState ={
    token:'' , user :{ name :'' , email: '',address : '', phoneNumber:'' }
} 

const loginSlice = createSlice({
    name : 'login' ,
    initialState , 
    reducers :{
        addToken :(state , action ) =>{
            state.token = action.payload
        },

        addUser : (state,action) =>{
            state.user = action.payload
        }

    }
})


export const {addToken , addUser} = loginSlice.actions

export default loginSlice.reducer