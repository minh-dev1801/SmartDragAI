import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

interface ExportButtonsProps {
  onDownloadXML: () => void;
}

const ExportButtons = ({
  onDownloadXML,
}: ExportButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onDownloadXML}
        icon={<DownloadOutlined />}
        variant="filled"
        color="purple"
      >
        Tải xuống BPMN
      </Button>
    </div>
  );
};

export default ExportButtons;
