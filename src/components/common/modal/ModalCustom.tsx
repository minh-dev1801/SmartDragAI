import { Button, Modal } from "antd";
import React from "react";

interface ModalCustomProp {
  open: boolean;
  content: React.ReactNode;
  setOpen: (open: boolean) => void;
}

const ModalCustom = ({ open, content, setOpen }: ModalCustomProp) => (
  <Modal
    centered
    footer={[
      <Button key="cancel" variant="text" color="primary">
        Hủy
      </Button>,
      <Button key="preview" variant="outlined" color="primary">
        Xem trước
      </Button>,
      <Button
        key="complete"
        href="https://google.com"
        target="_blank"
        variant="solid"
        color="primary"
      >
        Hoàn thành
      </Button>,
    ]}
    open={open}
    onCancel={() => setOpen(false)}
    width="95%"
  >
    {content}
  </Modal>
);

export default ModalCustom;
