import { Button } from "antd";

interface ExportButtonsProps {
  onDownloadXML: () => void;
  onCopyXML: () => void;
}

const ExportButtons = ({ onDownloadXML, onCopyXML }: ExportButtonsProps) => {
  return (
    <>
      <Button onClick={onDownloadXML} variant="solid" color="yellow">
        Tải XML
      </Button>
      <Button onClick={onCopyXML} variant="solid" color="green">
        Copy XML
      </Button>
    </>
  );
};

export default ExportButtons;
