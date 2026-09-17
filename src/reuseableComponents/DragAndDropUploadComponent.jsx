import React from "react";
import { Upload, message } from "antd";
import ButtonComponent from "./ButtonComponent";
import { FiUpload } from "react-icons/fi";

const { Dragger } = Upload;

const DragAndDropUploadComponent = ({
  panelType = false,
  onSuccess = () => { },
  onError = () => { },
  buttonName = "Upload File",
  accept = ".xlsx",
  handleUpload,
  uploading = false,
}) => {

  const commonUploadProps = {
    name: "file",
    multiple: false,
    showUploadList: false,
    accept,
    customRequest: async (options) => {
      const { file, onSuccess: success, onError: error } = options;

      try {
        await handleUpload(file);
        message.success(`${file.name} uploaded successfully`);
        success("ok");
        onSuccess(file);
      } catch (err) {
        message.error(`${file.name} upload failed`);
        error(err);
        onError(err);
      }
    },
  };

  return (
    <div className="bg-white my-2 rounded-lg">
      {panelType ? (
        <Dragger {...commonUploadProps}>
          <div className="justify-between flex flex-row items-center">
            <p className="text-xs/[14px] font-normal whitespace-nowrap font-roboto">
              Drag & Drop Files here
            </p>

            <ButtonComponent
              ButtonName={buttonName}
              variant="outlined"
              color="#000"
              buttonIcon={<FiUpload />}
              backgroundColor="#d9d9d9"
              className="text-xs/[14px] font-normal mx-1"
              loading={uploading}
            />
          </div>
        </Dragger>
      ) : (
        <Upload {...commonUploadProps}>
          <ButtonComponent
            ButtonName={buttonName}
            variant="outlined"
            color="#000"
            buttonIcon={<FiUpload />}
            backgroundColor="#d9d9d9"
            className="text-xs/[14px] font-normal mx-1"
            loading={uploading}
          />
        </Upload>
      )}
    </div>
  );
};

export default DragAndDropUploadComponent;