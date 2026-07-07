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
      return {
        ...state,
        course: [...state.course, action.payload],
      };
    },
  },
});

export const { cartCourse } = cartSlice.actions;
export default cartSlice.reducer;
