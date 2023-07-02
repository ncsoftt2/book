import { useDispatch } from "react-redux"
import { saveCategory, saveName, saveOffset, saveSort, searchBooks } from "../../slices/bookSlice"
import { Formik, Field,Form, ErrorMessage} from "formik"
import * as Yup from 'yup';
import styles from '../../styles/Header.module.css';
import { useNavigate } from "react-router-dom";
import {ROUTES} from '../../utils/routes';

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    return (
        <header className={styles.header}>
            <Formik
                initialValues={{
                    name: '',
                    category: '',
                    sort: 'relevance',
                    offset: 0
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Введите название')
                })}
                onSubmit={(value) => {
                    navigate(ROUTES.HOME)
                    if(value.name.trim().length === 0) return;
                    dispatch(searchBooks(`q=${value.name}${value.category ? "+" +value.category : ''}&startIndex=0&maxResults=10&orderBy=${value.sort}`))
                    dispatch(saveName(value.name))
                    dispatch(saveCategory(value.category))
                    dispatch(saveOffset(value.offset))
                    dispatch(saveSort(value.sort))
                }}
            >
                <Form className={styles.form}>
                    <div className={styles.input_name}>
                        <ErrorMessage name='name' component='div' className={styles.err_msg_name}/>
                        <Field id='name' name='name' type='search' autoComplete='off'/>                                            
                        <button type='submit'>поиск</button>                       
                    </div>
                    <div className={styles.select_input}>
                        <Field id='category' name='category' as="select">
                            <option value=''>Выбрать категорию</option>
                            <option value={`subject:art`}>Арт</option>
                            <option value={`subject:computers`}>Компьютеры</option>
                            <option value={`subject:medicine`}>Медицина</option>
                        </Field>
                        <Field id='sort' name='sort' as="select" >
                            <option value={'relevance'}>Relevance</option>
                            <option value={`newest`}>Newest</option>
                        </Field>
                    </div>
                </Form>
            </Formik>
        </header>
    )
}
export default Header;