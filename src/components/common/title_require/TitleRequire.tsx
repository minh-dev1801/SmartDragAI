import { Typography } from "antd";

const TitleRequire = ({ text }: { text: string }) => {
  return (
    <Typography.Title level={5}>
      {text}
      <span className="text-red-500">*</span>
    </Typography.Title>
  );
};

export default TitleRequire;
