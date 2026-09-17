import { useState } from "react";
import jsonData from "../data/jsonData.json";
import ButtonComponent from "../reuseableComponents/ButtonComponent";
import { sidebarMenus } from "../reuseableComponents/SidebarComponent";
import { ConfigProvider, Menu } from "antd";
import DynamicIconComponent from "../reuseableComponents/IconComponent";
import DynamicPage from "../reuseableComponents/DynamicPage";

const employeeNav = sidebarMenus.employee.items;
console.log("employeeNav", employeeNav);

const tabIcons = { Birthdays: "♙", Anniversaries: "♧", "New Joinees": "♨" };

function EmployeeDashboard({ user, onLogout }) {
  const [active, setActive] = useState("Home");
  const [clockedIn, setClockedIn] = useState(false);
  const [tab, setTab] = useState("Birthdays");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const employee = jsonData.employeeDashboard || {};
  const people = employee.people?.[tab] || [];
  const menuItems = employeeNav.map((item) => ({
    key: item.key,
    label: item.label,
    icon: <DynamicIconComponent iconName={item.icon} />,
    children: item.children?.map((child) => ({
      key: child.key,
      label: child.label
    }))
  }));
  return (
    <div className="employee-app">
      <aside
        className={`employee-sidebar${sidebarCollapsed ? " collapsed" : ""}`}
      >
        <div className="employee-brand">
          <span>{employee.brand?.logo || "e"}</span>
          <div>
            <strong>{employee.brand?.name || "emanage"}</strong>
            <small>HRMS &amp; PAYROLL</small>
          </div>
        </div>

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
              },
            },
          }}
        >

          <Menu
            mode="inline"
            inlineCollapsed={sidebarCollapsed}
            selectedKeys={[active]}
            items={menuItems}
            onClick={({ key }) => setActive(key)}
          />
        </ConfigProvider>
        <ButtonComponent className="employee-logout" onclickButton={onLogout}>
          ↪{!sidebarCollapsed && " Sign out"}
        </ButtonComponent>
      </aside>
      <div className="employee-main">
        <header className="employee-header">
          <ButtonComponent
            className="employee-menu-toggle"
            type="button"
            onclickButton={() => setSidebarCollapsed((value) => !value)}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            ☰
          </ButtonComponent>
          <div className="greeting">
            <small>{employee.greeting || "Welcome back"}</small>
            <strong>{user.name}</strong>
          </div>
          {/* <div className="header-shortcuts">
            {(employee.shortcuts || []).map((shortcut) => (
              <ButtonComponent key={shortcut}>
                {shortcut}
              </ButtonComponent>
            ))}
          </div> */}
          {/* <div className="company">
            <span className="company-logo">
              {employee.company?.logo || "LOGO"}
            </span>
            <div>
              <strong>{employee.company?.name}</strong>
              <small>{employee.company?.subtitle}</small>
            </div>
          </div> */}
        </header>
        {/* <div className="employee-toolbar">
          <ButtonComponent className="personal-tab">
            {employee.toolbar?.tab || "Personal"}
          </ButtonComponent>
          <div className="shift-box">◷ &nbsp;{employee.toolbar?.shift}</div>
          <ButtonComponent
            className="clock-button"
            onclickButton={() => setClockedIn(!clockedIn)}
          >
            ◷ &nbsp;{clockedIn ? "Clock out" : "Clock in"}
          </ButtonComponent>
        </div> */}
        {active === "Home" ? <main className="employee-content">
          <div className="employee-breadcrumb">
            <span>Dashboard</span>
            <b>›</b>
            <strong>{active}</strong>
          </div>
          <section className="duty-card">
            <div className="duty-heading">
              <h2>{employee.dutyTitle || "Duty overview"}</h2>
              <div className="duty-controls">
                <div className="duty-toggle">
                  {(employee.dutyModes || ["On Duty", "Finance"]).map(
                    (mode, index) => (
                      <ButtonComponent
                        className={index === 0 ? "selected" : ""}
                        key={mode}
                      >
                        {mode}
                      </ButtonComponent>
                    ),
                  )}
                </div>
                <select defaultValue={employee.years?.[0]}>
                  {(employee.years || []).map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
                <select defaultValue={employee.months?.[0]}>
                  {(employee.months || []).map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="duty-grid">
              {(employee.dutyStats || []).map((stat) => (
                <div className={`duty-stat ${stat.color}`} key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="people-card">
            <div className="people-tabs">
              {Object.keys(employee.people || {}).map((item) => (
                <ButtonComponent
                  className={tab === item ? "selected" : ""}
                  key={item}
                  onclickButton={() => setTab(item)}
                >
                  {tabIcons[item] || "•"} &nbsp;{item}
                </ButtonComponent>
              ))}
            </div>
            {people.map((person) => (
              <div className="person-row" key={person.name}>
                <div className="person-avatar">{person.name.charAt(0)}</div>
                <div>
                  <strong>{person.name}</strong>
                  <span>{person.subtitle}</span>
                </div>
                <ButtonComponent className="message-button">
                  ▢
                </ButtonComponent>
              </div>
            ))}
          </section>
        </main> : <DynamicPage title={active} />}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
