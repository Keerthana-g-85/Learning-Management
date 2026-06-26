import { configureStore} from '@reduxjs/toolkit'
import loginSlice from './LoginSlice'
import searchSlice from './SearchSlice'

export const store =  configureStore({
    reducer :{
        login : loginSlice,
        search : searchSlice
    }
})