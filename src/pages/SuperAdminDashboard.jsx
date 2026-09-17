import { useEffect, useState } from "react";
import jsonData from "../data/jsonData.json";
import SuperAdminAdministration from "./SuperAdminAdministration";
import SuperAdminTask from "./SuperAdminTask";
import CompanyList from "./Company/CompanyList";
import NewDeputedCompany from "./DeputedCompany/NewDeputedCompany";
import InputComponent from "../reuseableComponents/InputComponent";
import ButtonComponent from "../reuseableComponents/ButtonComponent";
import { sidebarMenus } from "../reuseableComponents/SidebarComponent";
import { ConfigProvider, Menu } from "antd";
import DynamicPage from "../reuseableComponents/DynamicPage";
import DynamicIconComponent from "../reuseableComponents/IconComponent";

const iconMap = {
  people: "●",
  tasks: "✓",
  rupee: "₹",
  bell: "♧",
  calendar: "▦",
  building: "▥",
  person: "♙",
  money: "₹",
  checklist: "✓",
  cart: "🛒",
  process: "▤",
  invoice: "▤",
  print: "▣",
  bank: "♜",
  report: "▤",
  screen: "▣",
};
const navIcons = [
  "IoSpeedometerOutline",
  "IoIosApps",
  "LuChartNoAxesCombined",
  "IoSettingsOutline",
];

function SuperAdminDashboard({ onLogout, role = "Super Admin" }) {
  const [active, setActive] = useState("Administration");
  const [search, setSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [administrationOpen, setAdministrationOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(true);
  const [systemOpen, setSystemOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [employeeDetailsOpen, setEmployeeDetailsOpen] = useState(true);
  const [purchaseOrderOpen, setPurchaseOrderOpen] = useState(true);
  const [expandedEmployeeDetails, setExpandedEmployeeDetails] = useState({});
  const [expandedSystemItems, setExpandedSystemItems] = useState({});
  const [expandedManage, setExpandedManage] = useState({});
  const [homeTab, setHomeTab] = useState("Welcome");
  const [quickView, setQuickView] = useState("grid");
  const [selectedCompany, setSelectedCompany] = useState("Airbase Labs India Private Limited");
  const [selectedDeputedCompany, setSelectedDeputedCompany] = useState("Airbase Labs India Private Limited");
  const data = jsonData.superAdminDashboard;
  const navigation = sidebarMenus.superAdmin.main;
  const currentUser = jsonData.users.find((user) => user.role === role) || {
    name: data.userName,
  };
  const systemChildren = sidebarMenus.superAdmin.system;
  const reportsChildren = sidebarMenus.superAdmin.reports;
  const employeeDetailsMenu = sidebarMenus.administration.employeeDetails;
  const purchaseOrderMenu = sidebarMenus.administration.purchaseOrder;
  const menuContains = (entries = [], value) =>
    entries.some((entry) => {
      const label = typeof entry === "string" ? entry : entry.label;
      const children = typeof entry === "string" ? [] : entry.children || [];
      return label === value || menuContains(children, value);
    });
  const administrationActive =
    active === "Administration" ||
    sidebarMenus.superAdmin.administration.includes(active) ||
    menuContains(sidebarMenus.superAdmin.manageTree, active) ||
    menuContains(employeeDetailsMenu, active) ||
    menuContains(purchaseOrderMenu, active);
  const taskActive =
    active === "Task" ||
    sidebarMenus.superAdmin.task.includes(active);
  const reportsActive =
    active === "Reports" || reportsChildren.includes(active);
  const systemActive = active === "System" || menuContains(systemChildren, active);
  const sidebarSection = administrationActive
    ? "Administration"
    : taskActive
      ? "Task"
      : reportsActive
        ? "Reports"
        : systemActive
          ? "System"
          : navigation.includes(active)
            ? active
            : "Home";
  const visibleNavigation = navigation.filter(
    (item) => item === sidebarSection,
  );
  const toMenuItems = (entries = []) =>
    entries.map((entry) => {
      const label = typeof entry === "string" ? entry : entry.label;
      const children = typeof entry === "string" ? [] : entry.children || [];
      const menuItem = {
        key: label,
        label,
      };
      if (children.length > 0) menuItem.children = toMenuItems(children);
      return menuItem;
    });
  const sidebarMenuItems = visibleNavigation.map((item) => {
    let children = [];
    if (item === "Administration") {
      children = [
        { label: "Manage", children: sidebarMenus.superAdmin.manageTree },
        { label: "Employee Details", children: employeeDetailsMenu },
        { label: "Purchase Order", children: purchaseOrderMenu },
      ];
    } else if (item === "Task") {
      children = sidebarMenus.superAdmin.task;
    } else if (item === "Reports") {
      children = reportsChildren;
    } else if (item === "System") {
      children = systemChildren;
    }
    return {
      key: item,
      label: item,
      icon: (
        <DynamicIconComponent
          iconName={navIcons[navigation.indexOf(item)]}
          iconSize="18px"
          color="#123B4A"
        />
      ),
      children: toMenuItems(children),
    };
  });
  const quickAccess = data.quickAccess.filter((item) =>
    `${item.title} ${item.description}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  useEffect(() => {
    setAdministrationOpen(administrationActive);
    setTaskOpen(taskActive);
    setSystemOpen(systemActive);
    if (!administrationActive) {
      setManageOpen(false);
      setExpandedManage({});
    }
  }, [active, administrationActive, taskActive, systemActive]);

  const selectNavigation = (item) => {
    setActive(item);
    setSearch("");
  };
  const toggleManageItem = (label) =>
    setExpandedManage((current) => ({ ...current, [label]: !current[label] }));
  const toggleEmployeeDetail = (label) =>
    setExpandedEmployeeDetails((current) => ({
      ...current,
      [label]: !current[label],
    }));
  const toggleSystemItem = (label) =>
    setExpandedSystemItems((current) => ({
      ...current,
      [label]: !current[label],
    }));
  const manageMenu = (
    <div className="super-manage-children">
      {sidebarMenus.superAdmin.manageTree.map((item) => (
        <div key={item.label}>
          <ButtonComponent
            type="button"
            className="super-manage-item"
            onclickButton={() =>
              item.children.length
                ? toggleManageItem(item.label)
                : selectNavigation(item.label)
            }
          >
            <span>
              {item.children.length
                ? expandedManage[item.label]
                  ? "−"
                  : "+"
                : "•"}
            </span>
            {item.label}
          </ButtonComponent>
          {item.children.length > 0 && expandedManage[item.label] && (
            <div className="super-manage-nested">
              {item.children.map((child) => {
                const childLabel =
                  typeof child === "string" ? child : child.label;
                const childChildren =
                  typeof child === "string" ? [] : child.children || [];
                return (
                  <div key={childLabel}>
                    <ButtonComponent
                      type="button"
                      onclickButton={() =>
                        childChildren.length
                          ? toggleManageItem(childLabel)
                          : selectNavigation(childLabel)
                      }
                    >
                      <span>
                        {childChildren.length
                          ? expandedManage[childLabel]
                            ? "−"
                            : "+"
                          : "•"}
                      </span>
                      {childLabel}
                    </ButtonComponent>
                    {childChildren.length > 0 && expandedManage[childLabel] && (
                      <div className="super-manage-nested">
                        {childChildren.map((nestedChild) => (
                          <ButtonComponent
                            type="button"
                            key={nestedChild}
                            onclickButton={() => selectNavigation(nestedChild)}
                          >
                            • &nbsp;{nestedChild}
                          </ButtonComponent>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const homePage = (
    <main className="super-home-page">
      <div className="super-welcome-strip">
        <strong>⌄ &nbsp;Welcome {currentUser.name}</strong>
        <span>Your Last Login Time {data.lastLogin}</span>
        <div>
          <ButtonComponent onclickButton={onLogout}>
            ↪ Sign Out
          </ButtonComponent>
        </div>
      </div>
      <nav className="super-home-tabs">
        {["Welcome", "Dashboard", "Statutory Compliance", "HR Dashboard"].map(
          (tab) => (
            <ButtonComponent
              type="button"
              className={homeTab === tab ? "active" : ""}
              key={tab}
              onclickButton={() => setHomeTab(tab)}
            >
              {tab}
            </ButtonComponent>
          ),
        )}
      </nav>
      <div className="super-metrics">
        {data.metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span className={`metric-icon ${metric.color}`}>
              {iconMap[metric.icon] || metric.icon}
            </span>
            <div>
              <small>{metric.label}</small>
              <strong>{metric.value}</strong>
              <ButtonComponent>{metric.action} ›</ButtonComponent>
            </div>
          </article>
        ))}
      </div>
      <section className="super-quick-panel">
        <div className="quick-header">
          <div>
            <h2>Quick Access</h2>
            <p>Access your frequently used features</p>
          </div>
          <div className="quick-view-toggle">
            <ButtonComponent
              className={quickView === "grid" ? "active" : ""}
              onclickButton={() => setQuickView("grid")}
            >
              ▦ &nbsp;Grid View
            </ButtonComponent>
            <ButtonComponent
              className={quickView === "list" ? "active" : ""}
              onclickButton={() => setQuickView("list")}
            >
              ☷ &nbsp;List View
            </ButtonComponent>
          </div>
        </div>
        <div
          className={
            quickView === "grid"
              ? "home-quick-grid"
              : "home-quick-grid list-view"
          }
        >
          {quickAccess.map((item, index) => (
            <ButtonComponent
              className="home-quick-card"
              key={item.title}
              onclickButton={() => selectNavigation(item.title)}
            >
              <span className={`quick-icon ${item.color}`}>
                {iconMap[item.icon] || item.icon}
              </span>
              <strong>
                {index + 1}. &nbsp;{item.title}
              </strong>
              <b>›</b>
            </ButtonComponent>
          ))}
        </div>
      </section>
      <footer className="super-footer">
        <span>About Us</span> | <span>Contact Us</span>
        <small>
          This site is best viewed in IE 11.0 or higher at a minimum screen
          resolution of 1024x768 pixels.
        </small>
      </footer>
    </main>
  );
  const dynamicPage = (
    <DynamicPage title={active} />
  );
  const page = taskActive ? (
    <SuperAdminTask
      search={search}
      setSearch={setSearch}
      onFeatureSelect={selectNavigation}
    />
  ) : active === "New Deputed Company" ? (
    <NewDeputedCompany />
  ) : active === "New Company" ? (
    <CompanyList openForm />
  ) : active === "Company List" ? (
    <CompanyList />
  ) : active === "Administration" ? (
    <SuperAdminAdministration
      search={search}
      setSearch={setSearch}
      onFeatureSelect={selectNavigation}
    />
  ) : (
    active === "Home" ? homePage : dynamicPage
  );

  return (
    <div
      className={
        `${sidebarCollapsed ? "super-admin-app sidebar-collapsed" : "super-admin-app"} ${active === "Home" ? "home-page-active" : ""}`
      }
    >
      <aside className="super-sidebar">
        <div className="super-logo">
          <b>E</b>
          <div>
            <strong>Emplyo</strong>
            <small>Complete HRMS &amp; Payroll Solution</small>
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
            items={sidebarMenuItems}
            selectedKeys={[active]}
            onClick={({ key }) => selectNavigation(key)}
          />
        </ConfigProvider>

        <nav className="legacy-super-navigation">
          {visibleNavigation.map((item) => (
            <div key={item}>
              <ButtonComponent
                type="button"
                className="active"
                onclickButton={() =>
                  item === "Administration"
                    ? setAdministrationOpen((open) => !open)
                    : item === "Task"
                      ? setTaskOpen((open) => !open)
                      : item === "Reports"
                        ? setReportsOpen((open) => !open)
                        : item === "System"
                          ? setSystemOpen((open) => !open)
                          : selectNavigation(item)
                }
              >
                <span>{navIcons[navigation.indexOf(item)] || "⌂"}</span>
                {item}
                {["Administration", "Task", "Reports", "System"].includes(item) && (
                  <i>
                    {item === "Administration"
                      ? administrationOpen
                        ? "−"
                        : "+"
                      : item === "Task"
                        ? taskOpen
                          ? "−"
                          : "+"
                        : item === "Reports"
                          ? reportsOpen
                            ? "−"
                            : "+"
                          : systemOpen
                            ? "−"
                            : "+"}
                  </i>
                )}
              </ButtonComponent>
              {item === "Administration" && administrationOpen && (
                <div className="super-admin-children">
                  <ButtonComponent
                    type="button"
                    className={active === "Manage" ? "active" : ""}
                    onclickButton={() => setManageOpen((open) => !open)}
                  >
                    <span>{manageOpen ? "−" : "+"}</span>Manage
                  </ButtonComponent>
                  {manageOpen && manageMenu}
                  <ButtonComponent
                    type="button"
                    className={active === "Employee Details" ? "active" : ""}
                    onclickButton={() =>
                      setEmployeeDetailsOpen((open) => !open)
                    }
                  >
                    <span>{employeeDetailsOpen ? "−" : "+"}</span>
                    Employee Details
                  </ButtonComponent>
                  {employeeDetailsOpen && (
                    <div >
                      {employeeDetailsMenu.map((entry) => {
                        const label =
                          typeof entry === "string" ? entry : entry.label;
                        const children =
                          typeof entry === "string" ? [] : entry.children || [];
                        const expandable = children.length > 0;
                        return (
                          <div key={label}>
                            <ButtonComponent
                              type="button"
                              onclickButton={() =>
                                expandable
                                  ? toggleEmployeeDetail(label)
                                  : selectNavigation(label)
                              }
                            >
                              <span>
                                {expandable
                                  ? expandedEmployeeDetails[label]
                                    ? "−"
                                    : "+"
                                  : "•"}
                              </span>
                              {label}
                            </ButtonComponent>
                            {expandable && expandedEmployeeDetails[label] && (
                              <div className="super-manage-nested">
                                {children.map((child) => (
                                  <ButtonComponent
                                    type="button"
                                    key={child}
                                    onclickButton={() => selectNavigation(child)}
                                  >
                                    <span>•</span>{child}
                                  </ButtonComponent>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <ButtonComponent
                    type="button"
                    onclickButton={() => setPurchaseOrderOpen((open) => !open)}
                  >
                    <span>{purchaseOrderOpen ? "−" : "+"}</span>
                    Purchase Order
                  </ButtonComponent>
                  {purchaseOrderOpen && (
                    <div className="super-manage-nested">
                      {purchaseOrderMenu.map((child) => (
                        <ButtonComponent
                          type="button"
                          key={child}
                          onclickButton={() => selectNavigation(child)}
                        >
                          <span>•</span>{child}
                        </ButtonComponent>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {item === "Task" && taskOpen && (
                <div className="super-admin-children task-sidebar-children">
                  {sidebarMenus.superAdmin.task.map((child) => (
                    <ButtonComponent
                      type="button"
                      key={child}
                      onclickButton={() => selectNavigation(child)}
                    >
                      <span>•</span>
                      {child}
                    </ButtonComponent>
                  ))}
                </div>
              )}
              {item === "Reports" && reportsOpen && (
                <div className="super-admin-children reports-sidebar-children">
                  {reportsChildren.map((child) => (
                    <ButtonComponent
                      type="button"
                      key={child}
                      onclickButton={() => selectNavigation(child)}
                    >
                      <span>•</span>
                      {child}
                    </ButtonComponent>
                  ))}
                </div>
              )}
              {item === "System" && systemOpen && (
                <div className="super-admin-children system-sidebar-children">
                  {systemChildren.map((child) => {
                    const children = child.children || [];
                    const expandable = children.length > 0;
                    return (
                      <div key={child.label}>
                        <ButtonComponent
                          type="button"
                          onclickButton={() =>
                            expandable
                              ? toggleSystemItem(child.label)
                              : selectNavigation(child.label)
                          }
                        >
                          <span>
                            {expandable
                              ? expandedSystemItems[child.label]
                                ? "−"
                                : "+"
                              : "•"}
                          </span>
                          {child.label}
                        </ButtonComponent>
                        {expandable && expandedSystemItems[child.label] && (
                          <div className="super-manage-nested">
                            {children.map((nestedChild) => (
                              <ButtonComponent
                                type="button"
                                key={nestedChild}
                                onclickButton={() =>
                                  selectNavigation(nestedChild)
                                }
                              >
                                <span>•</span>{nestedChild}
                              </ButtonComponent>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
      <div className="super-main">
        <header className="flex h-[55px] py-[10px] gap-16 justify-between">
          <div className="flex items-center gap-2">

            <ButtonComponent
              className="super-menu"
              type="button"
              onclickButton={() => setSidebarCollapsed((collapsed) => !collapsed)}
              aria-label="Toggle sidebar"
            >
              ☰
            </ButtonComponent>
            {role === "Admin" || role === "Super Admin" && (
              <div className="admin-company-switchers" aria-label="Company selection">
                <label className="admin-company-switcher">
                  <span className="admin-company-icon" aria-hidden="true">♙</span>
                  <span className="admin-company-copy">
                    <small>Company</small>
                    <select aria-label="Company" value={selectedCompany} onChange={(event) => setSelectedCompany(event.target.value)}>
                      <option>Airbase Labs India Private Limited</option>
                      <option>ABCD Company</option>
                    </select>
                  </span>
                  <span className="admin-company-chevron" aria-hidden="true">⌄</span>
                </label>
                <label className="admin-company-switcher deputed">
                  <span className="admin-company-icon" aria-hidden="true">♧</span>
                  <span className="admin-company-copy">
                    <small>Deputed Company</small>
                    <select aria-label="Deputed Company" value={selectedDeputedCompany} onChange={(event) => setSelectedDeputedCompany(event.target.value)}>
                      <option>Airbase Labs India Private Limited</option>
                      <option>ABCD Company</option>
                    </select>
                  </span>
                  <span className="admin-company-chevron" aria-hidden="true">⌄</span>
                </label>
              </div>
            )}
          </div>

          <div className="flex">
            <ButtonComponent className="super-user" onclickButton={onLogout}>
              <span>M</span>
              <div>
                <strong className="text-black">{currentUser.name}</strong>
                <small>{role}</small>
              </div>
              <i>⌄</i>
            </ButtonComponent>
          </div>
        </header>
        <nav className="super-tabs" aria-label="Main navigation">
          {navigation.map((item) => (
            <ButtonComponent
              type="button"
              className={active === item ? "active" : ""}
              key={item}
              onclickButton={() => {
                setActive(item);
                setSearch("");
              }}
            >
              {item}
            </ButtonComponent>
          ))}
        </nav>
        <div className="super-content">
          {page}
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
