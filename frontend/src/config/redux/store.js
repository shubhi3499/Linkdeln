/*
STEPS FOR State Management
1.Submit Action
2.Handle Action in it's reducer
3.Register Here - Reducer
*/

import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducer/authReducer"
import postReducer from "./reducer/postReducer"

export  const store = configureStore({
    reducer:{
        auth:authReducer,
        posts:postReducer
    }
})