import { Route, Routes } from "react-router-dom";
import {ROUTES} from '../../utils/routes'
import Home from "../Home/Home";
import SingleBook from "../BookList/SingleBook";

const AppRoutes = () => (
    <Routes>
        <Route path={ROUTES.HOME} element={<Home/>}/>
        <Route path={ROUTES.SINGLE_BOOK} element={<SingleBook />}/>
    </Routes>
)
export default AppRoutes