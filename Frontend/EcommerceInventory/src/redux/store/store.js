import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../reducer/sidebardata.js";
import IsLoggedInReducer from "../reducer/IsLoggedInReducer.js";


const store = configureStore({
    reducer:{
        sidebardata:sidebarReducer,
        isLoggedInReducer:IsLoggedInReducer
    }
});

export default store;