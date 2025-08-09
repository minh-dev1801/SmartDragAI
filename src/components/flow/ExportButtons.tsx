import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";

interface ExportButtonsProps {
  onDownloadXML: () => void;
  onCopyXML: () => void;
  onUploadXML: (file: File) => Promise<void>;
}

const ExportButtons = ({
  onDownloadXML,
  onCopyXML,
  onUploadXML,
}: ExportButtonsProps) => {
  const uploadProps: UploadProps = {
    name: "file",
    accept: ".xml",
    showUploadList: false,
    beforeUpload: (file) => {
      // Kiểm tra định dạng file
      const isXML =
        file.type === "application/xml" ||
        file.type === "text/xml" ||
        file.name.toLowerCase().endsWith(".xml");

      if (!isXML) {
        message.error("Vui lòng chọn file XML!");
        return false;
      }

      // Kiểm tra kích thước file (max 10MB)
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("File phải nhỏ hơn 10MB!");
        return false;
      }

      // Xử lý upload
      onUploadXML(file).catch(console.error);

      return false; // Prevent default upload behavior
    },
  };

  return (
    <div className="flex gap-2">
      <Button onClick={onDownloadXML} variant="solid" color="yellow">
        Tải xuống XML
      </Button>
      <Button onClick={onCopyXML} variant="solid" color="green">
        Copy XML
      </Button>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />} variant="solid" color="blue">
          Tải lên XML
        </Button>
      </Upload>
    </div>
  );
};

export default ExportButtons;
