import jsonData from '../data/jsonData.json'

export const sidebarMenus = {
  employee: {
    items: jsonData.employeeNavigation,
    icons: jsonData.employeeDashboard?.navIcons || [],
  },
  administration: {
    items: jsonData.administrationNavigation,
    employeeDetails: jsonData.employeeDetailsMenu,
    purchaseOrder: jsonData.purchaseOrderMenu,
    manageTree: jsonData.manageTree,
  },
  superAdmin: {
    main: jsonData.superAdminNavigation.main,
    administration: jsonData.superAdminNavigation.administrationChildren,
    task: jsonData.superAdminNavigation.taskChildren,
    reports: jsonData.superAdminNavigation.reportsChildren,
    system: jsonData.superAdminNavigation.systemChildren,
    manageTree: jsonData.manageTree,
  },
}

export default function SidebarComponent({ children, className = '' }) {
  return <aside className={className}>{children}</aside>
}
