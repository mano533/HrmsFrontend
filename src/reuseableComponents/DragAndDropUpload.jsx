import React from "react";
import {InboxOutlined} from "@ant-design/icons";
import {ConfigProvider, message, Upload} from "antd";
import {FiUpload} from "react-icons/fi";
import ButtonComponent from "./ButtonComponent";
const {Dragger} = Upload;

const props = {
    name: "file",
    multiple: false,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
        const {status} = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
};

const DragAndDropUplaod = () => (
    <ConfigProvider theme={{token: {colorBorder: "#CAD5E2", colorPrimaryHover: "green"}}}>
        <Dragger {...props}>
            <div className="flex justify-center ">
                <FiUpload size={30} color="#90A1B9" />
            </div>
            <p className="ant-upload-text font-bold">Drag and drop your Excel file</p>
            <p className="font-semibold text-[#45556C] ">or click to browse and select a file from your computer</p>
            <div className="my-3">
                <ButtonComponent ButtonName="Choose File" buttonIcon={<FiUpload size={15} />} />
            </div>

            <p className=" text-xs text-[#677792]" style={{margin: "2px 0px"}}>
                Supported Formats: .xlsx, .xls(Max size: 10MB)
            </p>
            <p className=" m-0 text-sm text-[#677792]">
                Requred columns: Employee ID, Name, Department, Basic Pay, Bank Detailes
            </p>
        </Dragger>
    </ConfigProvider>
);
export default DragAndDropUplaod;
