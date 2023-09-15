import { memo, FC, ReactNode } from "react";
import "./Modal.scss";

interface ModalProps {
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div className="overlay">
      <div className="modal">{children}</div>
    </div>
  );
};

export default memo(Modal);
