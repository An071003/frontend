import { Route, Routes } from "react-router-dom"
import Home from '../pages/Home/Home'
import FoodManager from "../pages/FoodManager/FoodManager"
import FoodList from "../componets/FoodList/FoodList"


const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/Foods/List" element={<FoodList/>} />
            <Route path="/Foods/manager" element={<FoodManager />} />
        </Routes>
    )
}

export default Router