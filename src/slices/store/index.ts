import { configureStore } from "@reduxjs/toolkit";
import search from '../bookSlice';

const store = configureStore({
    reducer: {search},
    devTools: true
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

