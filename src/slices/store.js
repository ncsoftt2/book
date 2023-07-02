import { configureStore } from "@reduxjs/toolkit";
import search from '../slices/bookSlice';

export const store = configureStore({
    reducer: {search},
    devTools: true
})