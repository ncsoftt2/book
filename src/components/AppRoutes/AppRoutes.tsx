import {Navigate, Route, Routes} from "react-router-dom";
import {ROUTES} from '../../utils/routes'
import Home from "../Home/Home";
import SingleBook from "../BookList/SingleBook";

const AppRoutes = () => (
    <Routes>
        <Route path={ROUTES.HOME} element={<Home/>}/>
        <Route path={ROUTES.SINGLE_BOOK} element={<SingleBook />}/>
        <Route path={'*'} element={<Navigate to={ROUTES.HOME} />}/>
    </Routes>
)
export default AppRoutes