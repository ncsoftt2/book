import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {API_KEY, BASE_URL} from '../utils/constans';

export const searchBooks = createAsyncThunk<List[],string | number>(
    'search/searchBooks',
    async (payload) => {
        const res = await axios(`${BASE_URL}?${payload}&apiKey=${API_KEY}`)
        return res.data.items
    }
)
export const singleBook = createAsyncThunk<Single,string>(
    'search/singleBook',
    async (payload: string) => {
        const res = await axios(`${BASE_URL}/${payload}`)
        return res.data.volumeInfo
    }
)

export interface List {
    id: string
    volumeInfo: {
        title: string
        categories: string[]
        imageLinks: {
            thumbnail: string
        }
    }
}
interface Single {
    imageLinks: {
        thumbnail: string
    }
    title: string
    authors: string[]
    categories: string[]
    description: string
}

interface InitialState {
    list: List[],
    single: Single | null,
    temp: {
        name: string,
        category: string,
        sort:  string,
        offset:  number
    },
    isLoading: boolean,
    isError: boolean
}

const initialState: InitialState = {
    list: [] as List[],
    single: null as Single | null,
    temp: {
        name: '',
        category: '',
        sort:  '',
        offset: 0
    },
    isLoading: false,
    isError: false
}

const bookSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        saveName: (state, {payload}) => {
            state.temp.name = payload
        },
        saveCategory: (state, {payload}) => {
            state.temp.category = payload
        },
        saveSort: (state, {payload}) => {
            state.temp.sort = payload
        },
        saveOffset: (state, {payload}) => {
            state.temp.offset = payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchBooks.pending, state => {
                state.isLoading = true
            })
            .addCase(searchBooks.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.isError = false
                state.list = payload
            })
            .addCase(searchBooks.rejected, state => {
                state.isError = true
                state.isLoading = false
            })
        builder
            .addCase(singleBook.pending, state => {
                state.isLoading = true
            })
            .addCase(singleBook.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.isError = false
                state.single = payload
            })
            .addCase(singleBook.rejected, state => {
                state.isError = true
                state.isLoading = false
            })
    }
})
const {reducer,actions} = bookSlice
export default reducer
export const {saveName,saveCategory,saveOffset,saveSort} = actions