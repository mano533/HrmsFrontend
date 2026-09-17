import {Breadcrumb} from "antd";
import moment from "moment";
import {useSelector} from "react-redux";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {greet} from "../CommonFuncitons/constant";

const BreadCrumbsComponent = ({showBreadCrumbs}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {userDetails} = useSelector((state) => state?.selectedMainDropdownDetails);

    const pathArray = location.pathname.split("/");
    const filteredPathArray = pathArray.slice(pathArray.length <= 2 ? pathArray.length - 1 : pathArray.length - 2);

    let mainModuleName = filteredPathArray[0].split("-")[0].toUpperCase();
    let moduleName = filteredPathArray[0].split("-").splice(1).join(" ").toUpperCase();
    let modules = [mainModuleName, moduleName];

    // this below code using for dynamic route in employee list
    let dynamicItem = filteredPathArray[1] || "";
    if (dynamicItem) {
        modules.push(dynamicItem);
    }

    console.log("userDetails", userDetails);

    return (
        <div className="mx-2 my-0.5 flex flex-col sm:flex-row justify-between items-start sm:items-center  gap-4">
            <Breadcrumb className="text-gray-600 text-xs m-0 p-0">
                {showBreadCrumbs &&
                    modules.map((item, i) => (
                        <Breadcrumb.Item
                            key={i}
                            // onClick={() => {
                            //   onclickBreadCreams(i);
                            // }}
                        >
                            <span
                                className="text-[10px] font-semibold tracking-wide"
                                style={{color: modules.length - 1 === i ? "var(--color-info)" : ""}}
                            >
                                {item}
                            </span>
                        </Breadcrumb.Item>
                    ))}
            </Breadcrumb>
            <div className="flex gap-1 items-center">
                <span className="text-xs text-[var(--color-info)]">
                    Hi User ({userDetails?.userName}) {greet()}
                </span>
                <div className="bg-[#fff] rounded px-2">
                    <span className="text-xs text-[var(--color-info)]">{moment().format("MMM DD , YYYY")}</span>
                </div>
                <div className="bg-[#fff] rounded px-2">
                    <span className="text-xs text-[var(--color-info)]">{moment().format("HH:MM A")}</span>
                </div>
            </div>
        </div>
    );
};

export default BreadCrumbsComponent;
