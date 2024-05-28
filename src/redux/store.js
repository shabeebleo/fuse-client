import {configureStore} from "@reduxjs/toolkit"
import {combineReducers} from "redux"
import { alertSlice } from "./alertSlice.js"
import { userSlice } from "./userSlice.js"
import { postSlice } from "./postSlice.js"
const rootReducer=combineReducers({
    alerts:alertSlice.reducer,
    user:userSlice.reducer,
    posts:postSlice.reducer
})

const store=configureStore({
    reducer:rootReducer
})
export default store