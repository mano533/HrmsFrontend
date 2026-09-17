import React, { useState } from "react";
import { Upload, Tooltip, ConfigProvider } from "antd";
import { FiUpload } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { ImAttachment } from "react-icons/im";
import ButtonComponent from "./ButtonComponent";
import { SliceText } from "./GeneralComponent";
import DynamicIconComponent from "./IconComponent";

const { Dragger } = Upload;

const UploadComponent = ({
  panelType, // true => drag panel, false => button only
  onSuccess = () => {},
  onError = () => {},
  buttonName = "Upload File",
  buttonProps = {},
  accept = ".xlsx",
  handleUpload,
  variant = "outlined",
  uploading,
  onDeleteFile,
  className,
  isbutton = false,
  isIconName,
  isIcon = false,
  iconColor,
  style,
  buttoncolor,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Prevent auto upload and set local file state
  const beforeUpload = (file) => {
    setSelectedFile(file);
    return false;
  };

  // Handle upload click
  const doUpload = async (file) => {
    if (!file) return;
    try {
      await handleUpload(file);
      setSelectedFile(null); // clear after success
      onSuccess(file);
    } catch (err) {
      onError(err);
    }
  };

  // Handle delete file
  const doDelete = () => {
    setSelectedFile(null);
    onDeleteFile?.();
  };

  return (
    <div
      className={
        className
          ? `${className} bg-white rounded-lg  w-full`
          : "bg-white my-2 rounded-lg"
      }
    >
      {panelType ? (
        <>
          {!selectedFile && (
            <Dragger
              accept={accept}
              showUploadList={false}
              beforeUpload={beforeUpload}
              className="w-full "
            >
              <div className="flex  ">
                <p className="text-xs font-normal  ">Drag & Drop Files here</p>

                {isbutton && (
                  <ButtonComponent
                    ButtonName={buttonName}
                    variant="outlined"
                    color="#000"
                    buttonIcon={<FiUpload color={buttoncolor} />}
                    backgroundColor="#d9d9d9"
                    className="text-xs font-normal mx-1"
                    loading={uploading}
                    {...buttonProps}
                  />
                )}
              </div>
            </Dragger>
          )}

          {selectedFile && (
            <div className="justify-between flex my-2 p-3">
              {/* File name */}
              <div className="flex flex-row">
                <ImAttachment size={15} />
                <ConfigProvider theme={{ token: { fontSize: 12 } }}>
                  <Tooltip title={selectedFile?.name}>
                    <p className="text-xs font-normal whitespace-nowrap font-roboto self-center px-1">
                      <SliceText text={selectedFile?.name} length={20} />
                    </p>
                  </Tooltip>
                </ConfigProvider>
              </div>

              {/* Actions */}
              <div className="flex justify-between gap-5">
                <FiUpload
                  size={15}
                  color="#683ca1"
                  className="cursor-pointer"
                  onClick={() => doUpload(selectedFile)}
                />
                <GoTrash
                  size={15}
                  color="red"
                  className="cursor-pointer"
                  onClick={doDelete}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <Upload
          accept={accept}
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleUpload}
        >
          <ButtonComponent
            ButtonName={buttonName}
            variant={variant}
            color={uploading ? "blue" : "#000"}
            buttonIcon={
              isIcon ? (
                <DynamicIconComponent
                  iconName={isIconName}
                  iconSize={14}
                  color="#683ca1"
                />
              ) : (
                <DynamicIconComponent
                  iconName="FiUpload"
                  iconSize="14px"
                  color={iconColor ? "#fff" : "#683ca1"}
                />
              )
            }
            style={style}
            backgroundColor="#d9d9d9"
            className="text-xs font-normal mx-1"
            loading={uploading}
            {...buttonProps}
          />
        </Upload>
      )}
    </div>
  );
};

export default UploadComponent;
