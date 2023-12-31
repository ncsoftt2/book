import React,{ useState, useEffect } from "react"
import { List, searchBooks } from "../../slices/bookSlice"
import Books from "./Books"
import Spinner from '../Spinner/Spinner';
import { saveOffset } from "../../slices/bookSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const BookList = () => {
    const [loading,setLoading] = useState(false)
    const {list,temp,isLoading,isError} = useAppSelector(({search}) => search)
    const [books,setBooks] = useState<List[]>([])
    const [isEnd,setEnd] = useState(false);
    useEffect(() => {
        setBooks(list)
    },[list])

    const dispatch = useAppDispatch()
    const onRequest = () => {
        setLoading(true)
        if(list.length < 10) return setEnd(true);
        dispatch(searchBooks(`q=${temp.name}${temp.category ? "+" +temp.category : ''}&startIndex=${temp.offset}&maxResults=10&orderBy=${temp.sort}`))
            .then(() => {
                onBookLoaded()
                setLoading(false)
            })
            dispatch(saveOffset(temp.offset + 10))

    }
    const onBookLoaded = () => {
        setLoading(true)
        setBooks((items) => [...books,...items])
        setLoading(false)
    }
    const spinner = isLoading ? <Spinner/> : null
    const error = isError ? <div style={{textAlign:'center',marginTop: '40px'}}>Error...</div> : null
    const content = !books.length && !isError && !isLoading
                        ? <div style={{textAlign:'center',marginTop: '40px'}}>empty</div> 
                        : <Books books={books} loading={loading} onRequest={onRequest} name={temp.name} offset={temp.offset} isEnd={isEnd}/>
    return (
            <> 
                {error}
                {content}
                {spinner}
            </>
    )
}
export default BookList
