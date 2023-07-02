import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { searchBooks } from "../../slices/bookSlice"
import Books from "./Books"
import Spinner from '../Spinner/Spinner';
import { saveOffset } from "../../slices/bookSlice";

const BookList = () => {
    const {list,temp,isLoading,isError} = useSelector(({search}) => search)
    const [newItemLoading,setNewItemLoading] = useState(false)
    const [books,setBooks] = useState([])
    useEffect(() => {
        setBooks(list)
    },[list])
    const dispatch = useDispatch();
    const onRequest = () => {
        dispatch(searchBooks(`q=${temp.name}${temp.category ? "+" +temp.category : ''}&startIndex=${temp.offset + 10}&maxResults=10&orderBy=${temp.sort}`))
            .then(onBookLoaded)
        dispatch(saveOffset(temp.offset + 10))
    }
    const onBookLoaded = (newBookList) => {
        setBooks([...books,...newBookList.payload])
    }
    const spinner = isLoading ? <Spinner/> : null
    const error = isError ? <div style={{textAlign:'center',marginTop: '40px'}}>Error...</div> : null
    const content = !books.length && !isError
                        ? <div style={{textAlign:'center',marginTop: '40px'}}>empty</div> 
                        : <Books books={books} onRequest={onRequest} name={temp.name} offset={temp.offset}/>
    return (
            <> 
                {error}
                {content}
                {spinner}
            </>
    )
}
export default BookList