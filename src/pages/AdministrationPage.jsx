import { useMemo, useState } from "react";
import { ConfigProvider, Menu } from "antd";
import {
  AppstoreOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

import InputComponent from "../reuseableComponents/InputComponent";
import ButtonComponent from "../reuseableComponents/ButtonComponent";
import { sidebarMenus } from "../reuseableComponents/SidebarComponent";
import DynamicIconComponent from "../reuseableComponents/IconComponent";
import { getAdminComponent } from "../data/generalFiles";

function AdministrationPage({ user, onLogout }) {
  const [activeKey, setActiveKey] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const userDetails = useSelector((state) => state?.userDetails?.userData);

  const userName =
    userDetails?.userData?.name || userDetails?.name || user?.name || "Admin";
  const userRole = userDetails?.role || user?.role || "Admin";
  const userInitials = userName.slice(0, 2).toUpperCase();

  const menuIconMap = {
    DashboardOutlined: <DashboardOutlined />,
    TeamOutlined: <TeamOutlined />,
    UserAddOutlined: <UserAddOutlined />,
  };

  const menuItems = useMemo(
    () =>
      sidebarMenus?.administration?.items?.map((item) => ({
        key: item.key,
        label: item.label,
        icon:
          menuIconMap[item.icon] ||
          <AppstoreOutlined />,
        popupClassName: item.children
          ? "administration-submenu-popup"
          : undefined,
        children: item.children?.map((child) => ({
          key: child.key,
          label: child.label,
          icon: child.icon ? (
            <DynamicIconComponent iconName={child.icon} />
          ) : undefined,
        })),
      })) || [],
    [],
  );

  const activeLabel = useMemo(() => {
    for (const item of menuItems) {
      if (item.key === activeKey) return item.label;
      const child = item.children?.find((entry) => entry.key === activeKey);
      if (child) return child.label;
    }
    return activeKey;
  }, [activeKey, menuItems]);

  const handleMenuClick = ({ key }) => {
    setActiveKey(key);
    setSearch("");
  };
  return (
    <div className="admin-app">
      <aside className={`admin-sidebar${sidebarCollapsed ? " collapsed" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">E</div>
          {!sidebarCollapsed && (
            <div>
              <strong>ADMIN</strong>
              <small>HRMS &amp; PAYROLL</small>
            </div>
          )}
        </div>

        <div className="sidebar-divider" />

        <nav className="sidebar-nav" aria-label="Administration navigation">
          {!sidebarCollapsed && <p className="sidebar-label">ADMIN</p>}
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemColor: "#FFFFFF",
                  itemBg: "#123B4A",
                  itemHoverColor: "#10A6A0",
                  itemHoverBg: "#1C5363",
                  itemSelectedColor: "#FFFFFF",
                  itemSelectedBg: "#10A6A0",
                  subMenuItemBg: "#123B4A",
                  activeBarWidth: 0,
                },
              },
            }}
          >
            <Menu
              mode="inline"
              inlineCollapsed={sidebarCollapsed}
              items={menuItems}
              selectedKeys={[activeKey]}
              triggerSubMenuAction="hover"
              onClick={handleMenuClick}
              style={{ background: "#123B4A" }}
            />
          </ConfigProvider>
        </nav>

        <ButtonComponent className="admin-logout" onclickButton={onLogout}>
          ↪{!sidebarCollapsed && <span>&nbsp; Sign out</span>}
        </ButtonComponent>
      </aside>

      <div className={`admin-main${sidebarCollapsed ? " sidebar-collapsed" : ""}`}>
        <header className="admin-header">
          <div className="header-left">
            <ButtonComponent
              className="super-menu"
              type="button"
              onclickButton={() => setSidebarCollapsed((value) => !value)}
              aria-label="Toggle sidebar"
            >
              ☰
            </ButtonComponent>

            {userRole === "Admin" && (
              <div className="admin-company-switchers" aria-label="Company selection">
                {[
                  ["♙", "Company"],
                  ["♧", "Deputed Company"],
                ].map(([icon, label]) => (
                  <button type="button" className="admin-company-switcher" key={label}>
                    <span className="admin-company-icon" aria-hidden="true">
                      {icon}
                    </span>
                    <span className="admin-company-copy">
                      <small>{label}</small>
                      <strong>Airbase Labs India Private Limited</strong>
                    </span>
                    <span className="admin-company-chevron" aria-hidden="true">
                      ⌄
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="header-right">

            <ButtonComponent className="super-user" type="button">
              {/* <span>{userInitials}</span> */}
              <div>
                <strong>{userName} </strong>
                <small>{userRole}</small>
              </div>
              <i>⌄</i>
            </ButtonComponent>
          </div>
        </header>

        <header className="topbar">
          <div className="breadcrumbs">
            <span>Admin</span>
            <b>›</b>
            <strong>{activeLabel}</strong>
          </div>
        </header>

        {getAdminComponent(activeLabel)}


      </div>
    </div>
  );
}

export default AdministrationPage;
