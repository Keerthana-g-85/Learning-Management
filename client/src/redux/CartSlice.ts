import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    course :[]
}

const cartSlice = createSlice ({
    name : 'cart',
    initialState ,
    reducers :{
        cartCourse : (state , action )=>{
            state.course =[...state.course , action.payload]
        }
    }
}) 

export const { cartCourse } = cartSlice.actions
export default cartSlice.reducer