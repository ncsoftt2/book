import {useState} from "react";
import Header from "../Header/Header";
import AppRoutes from "../AppRoutes/AppRoutes";

const App = () => {
    return (
        <div className="app">
            <Header/>
            <div>
                <AppRoutes />
            </div>
        </div>
    )
}
export default App