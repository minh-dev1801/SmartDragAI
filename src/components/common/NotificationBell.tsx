import { Badge } from "antd";
import React from "react";
import { CiBellOn } from "react-icons/ci";

const NotificationBell: React.FC = () => {
  return (
    <Badge count={200} overflowCount={99} size="small">
      <CiBellOn className="text-3xl"/>
    </Badge>
  );
};

export default NotificationBell;
