import { ConfigProvider, Menu } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DynamicIconComponent from "./IconComponent";

const SubMenuBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const subMenu = useSelector((state) => state?.sideBarSubMenu?.subMenuList);

    const isshowdefaultsubMenu = useSelector((state) => state?.sideBarSubMenu?.isShowDefault);

    const [activeMenu, setActiveMenu] = useState(String(subMenu?.[0]?.menuId || ""));

    const items = subMenu?.filter(item => item?.isMenuVisible)?.map((item) => {
        const menuItem = {
            key: String(item.menuId),
            label: item.menuList?.length ? (
                <div className="flex gap-1 items-center">
                    <span>{item.menuTitle}</span>
                    <DynamicIconComponent iconName="FaChevronDown" iconSize={12} color="#666666" />
                </div>
            ) : (
                <span>{item.menuTitle}</span>
            ),
        };
        console.log("item.menuList", item.menuList)

        if (item.menuList?.length) {
            menuItem.children = item.menuList?.filter(item => item?.isMenuVisible)?.map((subItem) => ({
                key: String(subItem.menuId),
                label: `${subItem.menuTitle}`,
            }));
        }

        return menuItem;
    });

    const flattenMenu = (items = []) => {
        return items.reduce((acc, item) => {
            if (item?.isMenuVisible === false) return acc;
            if (item?.menuList?.length) {
                // skip the parent, just push children flat
                acc.push(...flattenMenu(item.menuList));
            } else {
                acc.push(item);
            }
            return acc;
        }, []);
    };

    const allMenuItems = flattenMenu(subMenu);

    const activeMenuItem = allMenuItems?.find((item) => item?.path === location?.pathname);

    const handleMenuClick = ({ key }) => {
        const selectedMenu = allMenuItems.find((item) => String(item.menuId) === key);
        setActiveMenu(key);
        navigate(selectedMenu?.path);
        console.log(selectedMenu);
    };

    useEffect(() => {
        if (subMenu && isshowdefaultsubMenu) {
            setActiveMenu(String(subMenu?.[0]?.menuId || ""));
            navigate(subMenu?.[0]?.path);
        }
    }, [subMenu, isshowdefaultsubMenu]);

    const pathname = location.pathname;
    console.log("pathname",pathname)

    const selectedKey = useMemo(() => {
        if (pathname.startsWith("/payroll-Salary-Card")) return "8066";
        return String(activeMenuItem?.menuId) ?? activeMenu;
    }, [pathname]);

    return (
        <div className="bg-white border-t  border-gray-200 py-1 sub-menu-bar">
            <ConfigProvider
                theme={{
                    components: {
                        Menu: { horizontalLineHeight: "30px" },
                    },
                }}
            >
                <Menu
                    mode="horizontal"
                    selectedKeys={[selectedKey]}
                    items={items}
                    onClick={handleMenuClick}
                    style={{ flex: 1, minWidth: 0, background: "white", gap: 0 }}
                    className="bg-white! h-full! "
                    theme="light"
                />
            </ConfigProvider>
        </div>
    );
};

export default SubMenuBar;
