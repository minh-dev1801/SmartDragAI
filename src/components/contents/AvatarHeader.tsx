import { Avatar } from "antd";
import { FaArrowRightFromBracket, FaArrowUpRightFromSquare } from "react-icons/fa6";
import IconText from "../common/IconText";
import { FiTool } from "react-icons/fi";
import { PiGearBold, PiUserBold, PiWalletBold } from "react-icons/pi";

const AvatarHeader = () => {
  return (
    <div className="">
      <div className="flex-row-center px-2">
        <Avatar
          style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          size="large"
        >
          M
        </Avatar>

        <div>
          <p className=" text-black font-600">Minh Nguyen</p>
          <p className="text-gray-400">minhnv1801@gmail.com</p>
        </div>
      </div>

      <div className="flex-row-center justify-between text-blue-500 my-4 px-2">
        <p className="cursor-pointer">Quản lý tài khoản</p>
        <FaArrowUpRightFromSquare />
      </div>

      <div className="border-t border-t-gray-200 px-2"></div>

      <div className="my-2 cursor-pointer">
        <p className="text-gray-800 text-[15px] font-600 px-3">Workspace</p>

        <ul className="space-y-2 my-2">
          <li>
            <IconText
              text="Thông tin cá nhân"
              icon={<PiUserBold className="text-[16px]" />}
              divClassName="gap-3 hover-bg-gray"
            />
          </li>
          <li>
            <IconText
              text="Quản lý tài khoản"
              icon={<PiWalletBold className="text-[16px]" />}
              divClassName="gap-3 hover-bg-gray"
            />
          </li>
          <li>
            <IconText
              text="Cài đặt tài khoản"
              icon={<PiGearBold className="text-[16px]" />}
              divClassName="gap-3 hover-bg-gray"
            />
          </li>
          <li>
            <IconText
              text="Cài đặt Workspace"
              icon={<FiTool className="text-[16px]" />}
              divClassName="gap-3 hover-bg-gray"
            />
          </li>
        </ul>

        <div className="border-t border-t-gray-200 px-2"></div>
      </div>

      <div className="flex-row-center cursor-pointer px-3">
        <IconText
          text="Đăng xuất"
          icon={<FaArrowRightFromBracket className="text-[16px]" />}
          divClassName="gap-3 mt-1"
        />
      </div>
    </div>
  );
};

export default AvatarHeader;
