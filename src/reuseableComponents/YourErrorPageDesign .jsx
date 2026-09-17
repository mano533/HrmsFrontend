import {Button, Tag, Divider} from "antd";
import {
    ReloadOutlined,
    HomeOutlined,
    MailOutlined,
    MessageOutlined,
    PhoneOutlined,
    BugOutlined,
    FlagOutlined,
} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import moment from "moment/moment";
import {useRef, useState} from "react";


export default function YourErrorPageDesign({error}) {
    
    const navigate = useNavigate();
    const errorRef = useRef();
    const location = useLocation();
    const [reportLoader, setReportLoader] = useState(false);

    const contactOptions = [
        {icon: <MailOutlined />, label: "Email", href: "mailto:support@yourapp.com"},
        {icon: <MessageOutlined />, label: "Chat", href: "#chat"},
        {icon: <PhoneOutlined />, label: "Phone", href: "tel:+919876543210"},
    ];

    let pathname = location?.pathname;
    let time = moment().format("DD-MMM-YYYY,LT");
    let errorMessage = error.message;
    const body = `
Hello Support Team,

I encountered an unexpected application error.

Error: ${errorMessage}
Page: ${pathname}
Time: ${time}

Please review and assist in resolving this issue.

Thank you.

`;

    return (
        <div className="min-h-full bg-gray-100 flex flex-col" ref={errorRef}>
            {/* Page content area */}
            <div className="flex-1 relative overflow-hidden">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center px-4">
                    {/* Modal */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg w-full max-w-sm p-6">
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                <BugOutlined className="text-xl text-red-500" />
                            </div>
                            <div className="pt-0.5">
                                <h2 className="text-base font-semibold text-gray-900 mb-1 leading-none">
                                    Render error
                                </h2>
                                <p className="text-xs text-gray-400 leading-relaxed m-0">
                                    This component failed to render. Your session and data are unaffected.
                                </p>
                            </div>
                        </div>

                        {/* Error */}
                        <div className="bg-gray-50 rounded-xl px-3.5 py-2.5 mb-4 border border-gray-100">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs text-red-400 tracking-wide">
                                    Error: {error?.message}
                                </span>
                                <Tag color="red" className="text-xs m-0">
                                    Unhandled
                                </Tag>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-gray-400 tracking-wide">Location:</span>
                                <span className="font-mono text-xs text-gray-600 tracking-wide">
                                    {location?.pathname}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-xs text-gray-400 tracking-wide">Time:</span>
                                <span className="font-mono text-xs text-gray-600 tracking-wide">
                                    {moment().format("DD-MMM-YYYY,LT")}
                                </span>
                            </div>
                        </div>

                        <Divider className="my-0 mb-2" />

                        {/* Actions */}
                        <div className="flex gap-2 mb-2.5 ">
                            <ButtonComponent
                                ButtonName={"Go back"}
                                style={{width: "100%"}}
                                buttonSize="large"
                                variant="outlined"
                                onclickButton={() => {
                                    navigate(-1);
                                    window.location.reload();
                                }}
                            />
                            <ButtonComponent
                                ButtonName={"Retry"}
                                style={{width: "100%"}}
                                buttonSize="large"
                                onclickButton={() => {
                                    window.location.reload();
                                    navigate(0);
                                }}
                            />
                        </div>

                        {/* Report */}

                        <Button
                            onClick={() => {
                                setReportLoader(true);

                                window.location.href = `mailto:softwaresupport@alpconsulting.in?subject=${encodeURIComponent(
                                    `Admin Bug Report`
                                )}&body=${encodeURIComponent(body)}`;

                                setTimeout(() => {
                                    setReportLoader(false);
                                }, 2000);
                            }}
                            className="w-full h-9 rounded-xl border border-dashed border-gray-200 bg-transparent text-xs text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                            loading={reportLoader}
                            size="middle"
                            style={{height :30}}
                        >
                            <FlagOutlined />
                            Report this issue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
