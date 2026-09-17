import { Flex, Modal } from "antd";
import ButtonComponent from "./ButtonComponent";
import { IoTrashSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import DynamicIconComponent from "./IconComponent";
const ModalComponent = ({
  title,
  buttonLabel,
  showButton,
  onClickAction,
  isLoading,
  openModal,
  icon,
  onClose,
  modalContent,
  modalWidth,
  modalheight,
  minHeight = 100,
  isDelete,
  showCancelButton,
  showOkButton = true,
  cancelButtonName,
  actionButtonClick,
  actionButtonColor,
  actionButtonIcon,
  actionLoading,
  modalStyle,
  isHeader = true,
  showTitleIcon,
  titleIconColor,
  titleFontColor,
  titleIconName,
  titleFontsize = 15,
  zIndex,
  modeltitleHeight,
  overflowX = "auto",
  titlestyle,
}) => {
  return (
    <Flex vertical gap="middle" align="flex-center">
      <Modal
        // title={title}
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",

              gap: 8,
              height: modeltitleHeight,
              ...titlestyle,
            }}
          >
            {showTitleIcon && (
              <DynamicIconComponent
                iconName={titleIconName}
                color={titleIconColor}
              />
            )}
            <span
              style={{
                fontWeight: 600,
                fontSize: titleFontsize,
                color: titleFontColor,
              }}
            >
              {title}
            </span>
          </div>
        }
        centered
        open={openModal}
        onCancel={onClose} // 👈 handle close here
        onOk={() => console.log("OK clicked")}
        footer={
          showButton ? (
            <div className="flex justify-end gap-2">
              {showCancelButton && (
                <ButtonComponent
                  ButtonName={cancelButtonName ? cancelButtonName : "Cancel"}
                  variant="outlined"
                  buttonIcon={actionButtonIcon ? actionButtonIcon : null}
                  color={actionButtonColor ? actionButtonColor : "#000"}
                  backgroundColor={
                    actionButtonColor ? actionButtonColor : "#d9d9d9"
                  }
                  className="text-xs font-normal mx-1"
                  onclickButton={
                    actionButtonClick ? actionButtonClick : onClose
                  }
                  loading={actionLoading}
                />
              )}

              {showOkButton && <ButtonComponent
                ButtonName={buttonLabel}
                variant={"solid"}
                color={"#fff"}
                buttonIcon={icon}
                backgroundColor={"#d9d9d9"}
                className="text-xs font-normal mx-1"
                onclickButton={onClickAction}
                loading={isLoading}
              />}
              {/* <ButtonComponent
                ButtonName={isDelete ? "Delete" : buttonLabel}
                variant={isDelete ? "solid" : "outlined"}
                color={isDelete ? "#fff" : "#000"}
                buttonIcon={isDelete ? <FaTrashAlt/> : icon}
                backgroundColor={isDelete ? "red" : "#d9d9d9"}
                className="text-xs font-normal mx-1"
                onclickButton={onClickAction}
                loading={isLoading}
              /> */}
            </div>
          ) : null
        }
        width={modalWidth}
        styles={{
          content: { padding: 10, minHeight: minHeight },
          header: { borderBottom: isHeader ? "1px solid #E8E8E8" : "" },
          body: {
            height: modalheight,
            overflowY: "auto",
          }
        }}
        style={{ ...modalStyle }}
        closeIcon={isHeader}
        zIndex={zIndex}
      >
        <div className=" h-full ">
          {isDelete && (
            <div className="flex my-1">
              <IoTrashSharp size={30} color="red" />
              <span className="text-s font-roboto self-center">
                Are you sure you want to Delete?
              </span>
            </div>
          )}

          <div
            style={{
              overflowX: overflowX,
              Width: "100%",
            }}
          >
            {modalContent}
          </div>
        </div>
      </Modal>
    </Flex>
  );
};

export default ModalComponent;
