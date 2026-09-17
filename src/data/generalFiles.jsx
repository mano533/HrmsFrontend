import AdminDashboard from "../pages/AdminPageDetails/AdminDashboard"
import EmployeeList from "../pages/AdminPageDetails/EmployeeList"
import NewJoiners from "../pages/AdminPageDetails/NewJoiners"
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
