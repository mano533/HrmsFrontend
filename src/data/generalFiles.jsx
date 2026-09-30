import axios from "axios";
import { env } from "../constant/constant";
import AdminDashboard from "../pages/AdminPage/AdminDashboard"
import EmployeeList from "../pages/AdminPage/EmployeeList"
import NewJoiners from "../pages/AdminPage/NewJoiners"
import DynamicPage from "../reuseableComponents/DynamicPage"

export const getAdminComponent = (AdminComponent) => {

    switch (AdminComponent) {
        case "Dashboard":
            return <AdminDashboard />
        case "Employee List":
            return <EmployeeList />
        case "New Joiners":
            return <NewJoiners />
        default:
            return <DynamicPage title={AdminComponent} />
    }
}




export const generateToken = async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };

    const url = "https://localhost:7151/api/AuthControllers/login";

    const params = {
        username: env.VITE_REACT_USERNAME,
        password: env.VITE_REACT_PASSWORD,
    };

    try {
        const response = await axios.post(url, params, config);

        console.log("Login response:", response.data);

        const token = response.data.token;

        if (!token) {
            console.warn("No token returned from login API");
            return null;
        }

        sessionStorage.setItem("auth-token", token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        return token;

    } catch (error) {
        console.error(
            "Token generation failed:",
            error.response?.data || error.message
        );

        return null;
    }
};
