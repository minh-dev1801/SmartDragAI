import { Avatar, Button } from "antd";
import { features } from "../../constants/header";
import Image from "./Image";
import { FaTh } from "react-icons/fa";
import NotificationBell from "./NotificationBell";
import PopoverCus from "./PopoverCus";
import MenuHeader from "../contents/MenuHeader";

const Header: React.FC = () => {
  return (
    <div className="flex justify-between px-4 py-[10px]">
      <div className="flex gap-2">
        <Image
          src="/logo.jpg"
          alt="logo"
          className="w-14 rounded-full border border-gray-300 p-[2px]"
        />
        <h1 className="text-lg text-gray-700 font-semibold flex-row-center">
          Project name
        </h1>
      </div>

      <div className="flex-row-center gap-2">
        <div className="flex-row-center gap-[20px] mr-8">
          {features.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded-8px"
            >
              <Image
                src={item.src}
                alt={item.alt}
                className="w-[35px] h-[35px] rounded-8px"
              />
            </div>
          ))}
        </div>

        <div>
          <p className="text-gray-700 mr-1">
            Còn <span className="text-black">12 ngày</span> dùng thử
          </p>
        </div>

        <Button color="blue" variant="outlined">
          Nâng cấp
        </Button>

        <div className="mx-4">
          <NotificationBell />
        </div>

        <div className="mr-4">
          <PopoverCus content={<MenuHeader />}>
            <FaTh className="text-[19px]" />
          </PopoverCus>
        </div>

        <PopoverCus content={<MenuHeader />}>
          <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
            M
          </Avatar>
        </PopoverCus>
      </div>
    </div>
  );
};

export default Header;
