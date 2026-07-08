import { createSlice } from "@reduxjs/toolkit";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor_name: string;
  duration: string;
  thumbnail: string;
  level: string;
  price: string;
}

interface Cart {
  course: Course[];
}
const initialState: Cart = {
  course: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartCourse: (state, action) => {
      // return {
      //   ...state,
      //   course: [...state.course, action.payload],
      // };

      return {
        ...state,
        course: action.payload,
      };
      
    },

    removeCourse : (state , action) =>{
        const removeId = action.payload
        const index = state.course.findIndex((course)=> course.id === removeId)
        state.course.splice(index , 1)
    }
  },
});

export const { cartCourse , removeCourse } = cartSlice.actions;
export default cartSlice.reducer;
