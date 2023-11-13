import React from "react";
import { Link } from "react-router-dom";
import { List } from "../../slices/bookSlice";
import styles from '../../styles/Books.module.css';

type PropsType = {
    books: List[],
    onRequest: () => void,
    name: string
    offset: number
    isEnd: boolean
    loading: boolean
}

const Books: React.FC<PropsType> = ({books,onRequest,isEnd,loading}) => {
    return (
        <section className={styles.book_list}>
            <div className={styles.list}>
                {
                    books.map(({id,volumeInfo: {title,categories, imageLinks}},i) => (
                    <Link to={`/book/${id}`} key={i} className={styles.book}>
                        <div className={styles.image}>
                            {
                                imageLinks 
                                 ? <img src={imageLinks.thumbnail} />
                                 : null
                        }
                        </div>
                        <div className={styles.wrapper}>
                            <h3 className={styles.title}>{title}</h3>
                            <div className={styles.cat}>
                                {
                                    categories ? categories.join(', ') : ''
                                }
                                </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={styles.btnOrText}>
                {!isEnd && !loading && <button onClick={() => onRequest()} className={styles.btn_load}>load more</button>}
            </div>
        </section>
    )
}
export default Books;

