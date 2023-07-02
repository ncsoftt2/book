import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { saveOffset, singleBook } from "../../slices/bookSlice";
import Spinner from '../Spinner/Spinner';
import {ROUTES} from '../../utils/routes';
import styles from '../../styles/Single.module.css';

const SingleBook = () => {
    const {single,isLoading} = useSelector(({search}) => search)
    const dispatch = useDispatch()

    const {id} = useParams()
    useEffect(() =>{
        if(!id) return
        dispatch(singleBook(id))
    },[id])
    console.log(single)
    return (
        <section className={styles.single}>
            {isLoading ? <Spinner/> : !single ? null : (
                <>
                    <div className={styles.single_book}>
                        <div className={styles.single_img}>
                            {
                                single.imageLinks
                                    ? <img src={single.imageLinks.thumbnail} />
                                    : null
                            }
                        </div>
                        <div className={styles.right_side}>
                            <h2 className={styles.title}>{single.title}</h2>
                            <div className={styles.desc}>
                                <div className={styles.title_authors}>Авторы:</div>
                                <div className={styles.title_list}>
                                {
                                    single.authors 
                                        ? single.authors.join(' , ')
                                        : ''
                                }
                                </div>
                            </div>
                            <div className={styles.desc}>
                                <div className={styles.title_authors}>Категории:</div>
                                <div className={styles.title_list}>
                                    {single.categories ? single.categories.join(', ') : ''}
                                </div>
                            </div>
                            <div className={styles.description}>
                                {single.description ? single.description.slice(0,100) : 'нет описания'}
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <Link to={ROUTES.HOME}>На главную</Link>
                    </div>
                </>
            )}
        </section>
    )
}
export default SingleBook;