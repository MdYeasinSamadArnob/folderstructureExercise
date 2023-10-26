import { ReactNode } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ViewModal = ({
  children,
  OnOk,
  onCancel,
  okText,
  cancelText,
  onclose,
  isOpen,
}: {
  children: ReactNode;
  OnOk: () => void;
  onCancel: () => void;
  onclose: () => void;
  okText?: string;
  cancelText?: string;
  isOpen: boolean;
}): JSX.Element => {
  return (
    <div className={`modal-container ${isOpen ? "open" : ""}`}>
      <div className="modal-inner">
        <div className="modal-close-icon">
          <span onClick={() => onclose()}>
            {" "}
            <AiOutlineCloseCircle />
          </span>
        </div>
        <div>{children}</div>
        <div className="modal-action-footer">
          <button onClick={() => onCancel()}>{cancelText || "Cancel"}</button>
          <button onClick={() => OnOk()}>{okText || "Save"}</button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
