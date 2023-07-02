import { Link } from "react-router-dom";
import styles from '../../styles/Books.module.css';

const Books = ({books,onRequest,name,offset}) => {
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
            {
            books.length > 0 
                ? <button onClick={() => onRequest(name,offset)} className={styles.btn_load}>load more</button> 
                : null
                }
            </div>
        </section>
    )
}
export default Books;

